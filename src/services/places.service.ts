import {Coords} from "../models/coords.model";
import {Injectable} from "@angular/core";
import {MapsAPILoader} from "@agm/core";
import {UtilService} from "./util";
import * as _ from 'lodash';

declare var google;

@Injectable()
export class PlacesService {

  placesService: any;

  constructor(private mapsApiLoader: MapsAPILoader, private util: UtilService) {
  }

  initGoogleMapsPlacesService(map: any) {
    if (this.placesService) {
      return Promise.resolve(this.placesService);
    }
    return this.mapsApiLoader.load()
    .then(() => {
      const googleMap = new google.maps.Map(map);
      this.placesService = new google.maps.places.PlacesService(googleMap);
      console.log('Initialized Places API');
      return this.placesService;
    });
  }

  nearbySearch(location: Coords) {

    console.log('Search nearby', location);

    const request:any = {
      location: location,
      radius: 10000,
      type: ['locality']
    };

    return new Promise((resolve, reject) => {
      this.placesService.nearbySearch(request, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log('Nearby', results);
          return resolve(_.map(results, 'name'));
        }
        this.util.alertError(status);
        return reject(status);
      });
    });
  }
}
