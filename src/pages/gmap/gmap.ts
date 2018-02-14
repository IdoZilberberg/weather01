import {Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core/";
import {IonicPage, LoadingController} from "ionic-angular";
import {Geolocation} from "@ionic-native/geolocation";
import {UtilService} from "../../services/util";
import {Location} from "../../models/location";
import {WeatherService} from "../../services/weather";
import {CurrentConditions} from "../../models/current-conditions";
// import {PlacesAutocompleteService} from "../../services/places-autocomplete";
// import { MapsAPILoader } from '@agm/core';


@IonicPage()
@Component({
  selector: 'w-page-gmap',
  templateUrl: 'gmap.html'
})
export class GMapPage /*implements OnInit*/ {

  // @ViewChild("search")
  // public searchElementRef: ElementRef;

  searchInput: string = '';

  markers: Location[] = [
    {lat: 32.0, lng: 34.0},
    {lat: 32.0, lng: 34.3},
    {lat: 32.0, lng: 34.6}
  ];

  currentLocation: Location = {lng: 32.3173252, lat: 34.8469344};
  zoom: number = 16;
  currentConditions: CurrentConditions = null;


  constructor(private loadingCtrl: LoadingController,
              private geolocation: Geolocation,
              private weather: WeatherService,
              private util: UtilService,
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
  //         this.currentLocation.lat = place.geometry.location.lat();
  //         this.currentLocation.lng = place.geometry.location.lng();
  //         this.zoom = 12;
  //       });
  //     });
  //   });
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.onLocate();
    // this.onReloadWeather();
  }

  ionViewWillEnter() {
  }

  onLocate() {
    const loading = this.loadingCtrl.create({
      content: 'מחפש אותי...'
    });
    loading.present();
    this.geolocation.getCurrentPosition()
    .then(location => {
      loading.dismiss();
      this.currentLocation.lat = location.coords.latitude;
      this.currentLocation.lng = location.coords.longitude;


    })
    .catch(err => {
      loading.dismiss();
      this.util.alertError(err.message);
    });

  }

  onReloadWeather() {
    console.log('Reloading weather');

    this.weather.getCurrentConditionsForLocation(this.currentLocation)
    .subscribe(
      (currentConditions: CurrentConditions) => {
        this.currentConditions = currentConditions;
      },
      error => {
        this.util.alertError(error.message);
      });

  }


  onMapClick(ev: MouseEvent) {

    this.currentLocation.lat = ev.coords.lat;
    this.currentLocation.lng = ev.coords.lng;
    console.log(this.currentLocation);

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
