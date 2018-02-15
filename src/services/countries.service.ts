import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Country} from "../models/country.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CountriesService {

  constructor(private http: HttpClient) {}

  getCountryInfo(countryCode: string): Observable<Country> {

    const url = `https://restcountries.eu/rest/v2/alpha/${countryCode}`;
    if(!countryCode)  {
      return Observable.of(null);
    }
    return this.http.get(url)
    .map((result:any)=> {

      const res:Country = {
        name: result.name,
        code: countryCode,
        population: result.population,
        capital: result.capital,
        currency: result.currencies ? result.currencies[0].name : null,
        area: result.area,
        nativeName: result.nativeName,
        flagUrl: result.flag
      };

      return res;
    });


  }

}
