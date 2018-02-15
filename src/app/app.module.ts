import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {Geolocation} from "@ionic-native/geolocation";
import {AgmCoreModule} from "@agm/core";
import {UtilService} from "../services/util";
import {CurrentConditionsComponent} from "../components/current-conditions-cmp/current-conditions.cmp";
import {GMapPage} from "../pages/gmap/gmap";
import {WeatherService} from "../services/weather";
import {HttpClientModule} from "@angular/common/http";
import {PlacesAutocompleteService} from "../services/places-autocomplete";
import {PlacesService} from "../services/places.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GMapPage,
    CurrentConditionsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC40A5DlwkSPbZRsIAV9W4-8czO_KZDs5Q',
      libraries: ["places"]
    }),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GMapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    UtilService,
    WeatherService,
    PlacesAutocompleteService,
    PlacesService
  ]
})
export class AppModule {
}
