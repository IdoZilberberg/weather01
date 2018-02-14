import {GOOGLE_API_KEY} from "../app/constants";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/do";
import {Injectable} from "@angular/core";

@Injectable()
export class PlacesAutocompleteService  {

  constructor(private http: HttpClient) {}

  getPlacesSuggestions(input: string)  {

    // Sample: https://maps.googleapis.com/maps/api/place/autocomplete/xml?input=Amoeba&types=establishment&location=37.76999,-122.44696&radius=500&key=YOUR_API_KEY
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=establishment&location=37.76999,-122.44696&radius=500&key=${GOOGLE_API_KEY}`;

    return this.http.get(url)
    .do((res: any) => {
      console.log(res);
      return res;
    });
  }
}
