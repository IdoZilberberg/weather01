import {Coords} from "../models/coords.model";
import {Injectable} from "@angular/core";
import {MapsAPILoader} from "@agm/core";
import {UtilService} from "./util.service";
import * as _ from 'lodash';
import {Place} from "../models/place.model";

declare var google;

@Injectable()
export class PlacesService {

  private _googlePlacesService: any;
  private _geocoderService: any;

  constructor(private mapsApiLoader: MapsAPILoader, private util: UtilService) {
  }

  initGoogleMapsPlacesService() {
    if (this._googlePlacesService) {
      return Promise.resolve(this._googlePlacesService);
    }
    return this.mapsApiLoader.load()
    .then(() => {
      // const googleMap = new google.maps.Map(map);
      // this._googlePlacesService = new google.maps.places.PlacesService(googleMap);
      this._geocoderService = new google.maps.Geocoder;
      console.log('Initialized Places API');
      return true;
    });
  }

  resolvePlace(coords: Coords): Promise<Place> {
    // return this._nearbySearch(coords)
    // .then(locations => {
    //   if (locations) {
    //
    //     const place: Place = {
    //       locality: locations[0].locality,
    //       coords: coords
    //     };
    //
    //     return place;
    //   }
    // });

    return this._coordsToPlace(coords)
    .then(result => {
      console.log(result);
      return result;
    });

  }

  private _coordsToPlace(coords: Coords): Promise<Place> {
    return new Promise((resolve, reject) => {
      const request: any = {
        'location': coords
      };
      this._geocoderService.geocode(request, (results, status) => {
        if(status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS)  {
          console.log('No geocoding results');
          return resolve(null);
        }
        else if (status === google.maps.places.PlacesServiceStatus.OK) {
          if(!results[0] || !results[0].address_components) {
            return resolve(null);
          }
          const country = _.find(results[0].address_components, cmp=>cmp.types.includes("country"));
          const state = _.find(results[0].address_components, cmp=>cmp.types.includes("administrative_area_level_1"));
          const locality = _.find(results[0].address_components, cmp=>cmp.types.includes("locality"));

          return resolve(<Place>{
            country: country.long_name,
            countryCode: country.short_name,
            state: state ? state.long_name : null,
            stateCode: state ? state.short_name : null,
            locality: locality ? locality.long_name : null,
            coords: coords
          });
        }
        // this.util.alertError(status);
        return reject(status);
      });

    });
  }

  _nearbySearch(location: Coords) {

    console.log('Search nearby', location);

    const request: any = {
      location: location,
      radius: 10000,
      type: ['locality', 'country']
    };

    return new Promise((resolve, reject) => {
      this._googlePlacesService._nearbySearch(request, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          return resolve(results);
        }
        this.util.alertError(status);
        return reject(status);
      });
    });
  }
}
