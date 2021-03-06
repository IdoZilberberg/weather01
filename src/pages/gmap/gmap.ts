import {Component, ElementRef, NgZone, ViewChild} from "@angular/core/";
import {IonicPage, LoadingController, NavController, Slides, ToastController} from "ionic-angular";
import {Geolocation} from "@ionic-native/geolocation";
import {UtilService} from "../../services/util.service";
import {Coords} from "../../models/coords.model";
import {WeatherService} from "../../services/weather.service";
import {CurrentConditions} from "../../models/current-conditions.model";
import {Place} from "../../models/place.model";
import {PlacesService} from "../../services/places.service";
import {Forecast} from "../../models/forecats.model";
import {PlacePage} from "../place/place.page";
import {CountriesService} from "../../services/countries.service";


declare var google;

@IonicPage()
@Component({
  selector: 'w-page-gmap',
  templateUrl: 'gmap.html'
})
export class GMapPage /*implements OnInit*/ {

  @ViewChild("map") mapDiv: ElementRef;
  @ViewChild("search") searchElementRef: any;
  @ViewChild("hourlySlides") hourlySlides: Slides;
  @ViewChild("dailySlides") dailySlides: Slides;


  searchInput: string = '';
  searchVisible = false;
  autocompleteGoogleService: any;
  // googleMap: any;

  // markers: Coords[] = [
  //   {lat: 32.0, lng: 34.0},
  //   {lat: 32.0, lng: 34.3},
  //   {lat: 32.0, lng: 34.6}
  // ];

  currentPlace: Place = {coords: {lat: 32.3098, lng: 34.8739}};
  zoom: number = 12;
  streetViewEnabled = true;
  currentConditions: CurrentConditions = null; //DEFAULT_CURRENT_CONDITIONS;
  forecasts: Forecast[] = []; //DEFAULT_FORECASTS;
  hourlyForecasts: Forecast[] = [];


  constructor(
              private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private geolocation: Geolocation,
              private weather: WeatherService,
              private util: UtilService,
              private places: PlacesService,
              private countries: CountriesService,
              private ngZone: NgZone) {
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit MapPage');
    this.places.initGoogleMapsPlacesService()
    .then(() => {
      // this.googleMap = new google.maps.Map(this.mapDiv);
      const autocompleteOptions = {};

      const inputElement = this.searchElementRef.getNativeElement().getElementsByTagName('input')[0];
      this.autocompleteGoogleService = new google.maps.places.Autocomplete(
        inputElement, autocompleteOptions);

      this.autocompleteGoogleService.addListener('place_changed', this._onPlaceChanged.bind(this));
      this.onLocate();
    });
  }


  onLocate() {
    const loading = this.loadingCtrl.create({
      content: 'מחפש אותי...'
    });
    loading.present();
    this.geolocation.getCurrentPosition()
    .then(location => {
      this.searchInput = '';
      loading.dismiss();
      return this._updateCurrentPlace({lat: location.coords.latitude, lng: location.coords.longitude});
    })
    .then(() => {
      this.onReloadWeather();
    })
    .catch(err => {
      loading.dismiss();
      this.util.alertError(err.message);
    });

  }

  onToggleSearch()  {
    this.searchVisible = !this.searchVisible;
  }

  onReloadWeather() {
    console.log('Reloading weather');

    this.weather.getCurrentConditionsForLocation(this.currentPlace.coords)
    .subscribe(
      (currentConditions: CurrentConditions) => {
        this.currentConditions = currentConditions;
        console.log('Current conditions', this.currentConditions);
      },
      error => {
        this.util.alertError(error.message);
      });

    this.weather.getForecastsForLocation(this.currentPlace.coords)
    .subscribe(
      (forecasts: Forecast[]) => {
        this.forecasts = forecasts;
        console.log('Forecasts: ', forecasts);
      },
      error => {
        this.util.alertError(error.message);
      });

    this.weather.getHourlyForecastsForLocation(this.currentPlace.coords)
    .subscribe(
      (hourlyForecasts: Forecast[]) => {
        this.hourlyForecasts = hourlyForecasts;
        console.log('Hourly forecasts: ', hourlyForecasts);
      },
      error => {
        this.util.alertError(error.message);
      });

    this.hourlySlides.slideTo(0);
    this.dailySlides.slideTo(0);

  }

  onClickTemp() {
    console.log('onClickTemp');
    this.weather.getForecastsForLocation(this.currentPlace.coords)
    .subscribe(
      (forecasts: Forecast[]) => {
        this.forecasts = forecasts;
        console.log(forecasts);
      },
      error => {
        this.util.alertError(error.message);
      });
  }

  _updateCurrentPlace(coords: Coords) {
    return this.places.resolvePlace(coords)
    .then((place: Place) => {
      const newPlace = place;
      if (newPlace) {
        this.countries.getCountryInfo(newPlace.countryCode)
        .subscribe(
          countryInfo => {
            newPlace.countryInfo = countryInfo;
            this.currentPlace = newPlace;
          },
          error => {
            console.log('Error', error.message);
          }

        );


        return this.currentPlace;
      } else {
        const toast = this.toastCtrl.create({
          message: 'No result',
          duration: 1500
        });
        toast.present();
        return null;
      }
    });

  }

  onMapClick(ev: any) {
    return this._updateCurrentPlace(ev.coords);
  }

  onAdd() {
    this.util.alert('Sorry', 'Not implemented!');
  }

  _onPlaceChanged() {
    this.searchVisible = false;
    const googlePlace = this.autocompleteGoogleService.getPlace();
    console.log('Place changed:', googlePlace);
    if (googlePlace.geometry) {
      this.ngZone.run(() => {
        this.searchInput = '';
        return this._updateCurrentPlace(<Coords>{
          lat: googlePlace.geometry.location.lat(),
          lng: googlePlace.geometry.location.lng()
        })
        .then(() => {
          return this.onReloadWeather();
        })
        .catch(error => {
          this.util.alert('Center on searched place', error.message);
          this.currentConditions = null;
          this.forecasts = [];
          this.hourlyForecasts = [];
        });
      });
    }
  }

  onClickFlagOnPlace(place: Place) {
    console.log('gmap: Open place page');
    this.navCtrl.push(PlacePage, {place: place});
  }
}
