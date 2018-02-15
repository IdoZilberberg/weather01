import {Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core/";
import {IonicPage, LoadingController} from "ionic-angular";
import {Geolocation} from "@ionic-native/geolocation";
import {UtilService} from "../../services/util";
import {Coords} from "../../models/coords.model";
import {WeatherService} from "../../services/weather";
import {CurrentConditions} from "../../models/current-conditions.model";
import {Place} from "../../models/place.model";
import {PlacesService} from "../../services/places.service";
import {platformBrowser} from "@angular/platform-browser";
// import {PlacesAutocompleteService} from "../../services/places-autocomplete";
// import { MapsAPILoader } from '@agm/core';

declare var google;

@IonicPage()
@Component({
  selector: 'w-page-gmap',
  templateUrl: 'gmap.html'
})
export class GMapPage /*implements OnInit*/ {

  @ViewChild("map") mapDiv: ElementRef;
  // @ViewChild("search")
  // public searchElementRef: ElementRef;

  searchInput: string = '';

  markers: Coords[] = [
    {lat: 32.0, lng: 34.0},
    {lat: 32.0, lng: 34.3},
    {lat: 32.0, lng: 34.6}
  ];

  currentPlace: Place = {coords: {lng: 32.3173252, lat: 34.8469344}};
  zoom: number = 16;
  currentConditions: CurrentConditions = null;


  constructor(private loadingCtrl: LoadingController,
              private geolocation: Geolocation,
              private weather: WeatherService,
              private util: UtilService,
              private places: PlacesService
              // private placesService: PlacesAutocompleteService,
              // private mapsAPILoader: MapsAPILoader,
              // private ngZone: NgZone
              ) {
  }

  // ngOnInit(): void {
  //
  //   this.mapsAPILoader.load().then(() => {
  //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef, {
  //       types: ["address"]
  //     });
  //     autocomplete.addListener("place_changed", () => {
  //       this.ngZone.run(() => {
  //         //get the place result
  //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  //
  //         //verify result
  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }
  //
  //         //set latitude, longitude and zoom
  //         this.currentPlace.lat = place.geometry.location.lat();
  //         this.currentPlace.lng = place.geometry.location.lng();
  //         this.zoom = 12;
  //       });
  //     });
  //   });
  // }

  ionViewDidLoad() {
    // this.onReloadWeather();
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad MapPage');
    this.places.initGoogleMapsPlacesService(this.mapDiv)
    .then(() => {
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
      loading.dismiss();
      this.currentPlace.coords.lat = location.coords.latitude;
      this.currentPlace.coords.lng = location.coords.longitude;
    })
    .catch(err => {
      loading.dismiss();
      this.util.alertError(err.message);
    });

  }

  onReloadWeather() {
    console.log('Reloading weather');

    this.weather.getCurrentConditionsForLocation(this.currentPlace.coords)
    .subscribe(
      (currentConditions: CurrentConditions) => {
        this.currentConditions = currentConditions;
      },
      error => {
        this.util.alertError(error.message);
      });

  }


  onMapClick(ev: any) {

    this.currentPlace.coords.lat = ev.coords.lat;
    this.currentPlace.coords.lng = ev.coords.lng;
    console.log(this.currentPlace);

    this.places.nearbySearch(this.currentPlace.coords)
    .then(locations => {
      if(locations) {
        this.currentPlace.locality = locations[0];
      }
    });


  }

  onAdd() {
    this.util.alert('Sorry', 'Not implemented!');
  }

  // onSearchInput($event: UIEvent) {
  //   console.log(`Search input: `, this.searchInput);
  //   if(this.searchInput.length>0) {
  //     this.placesService.getPlacesSuggestions(this.searchInput)
  //     .subscribe(
  //       (result) => {
  //         console.log(result);
  //       },
  //       (error) => {
  //         this.util.alertError(error.message);
  //       }
  //       );
  //   }
  // }
}
