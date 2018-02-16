import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {Coords} from "../models/coords.model";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";
import {CurrentConditions} from "../models/current-conditions.model";
import moment from 'moment';

const WU_KEY = '189ac1342315df89';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  _convertWuWeatheeToCurrentConditions(wuWeather: any): CurrentConditions {

    // return DEFAULT_CURRENT_CONDITIONS;
    if(!wuWeather || !wuWeather.current_observation)  {
      return null;
    }

    const current = wuWeather.current_observation;
    const now = moment(current.local_epoch * 1000);
    const res = {
      date: now.toISOString().substr(0, 10),
      measurementTime: now.toISOString(),
      // country: current.display_location.state_name,
      // city: current.display_location.city,
      coords: {
        lat: current.observation_location.latitude,
        lng: current.observation_location.longitude
      },
      station: current.observation_location.full,
      temp: current.temp_c,
      weather: current.weather,
      relativeHumidity: current.relative_humidity,
      dewPoint: current.dewpoint_c,
      precipitationToday: current.precip_today_metric,
      pressure: current.pressure_mb
    };
    return res;
  }

  getCurrentConditionsForLocation(location: Coords): Observable<CurrentConditions> {

    const url = `http://api.wunderground.com/api/${WU_KEY}/conditions/q/${location.lat},${location.lng}.json`;

    // return Observable.of(null)

    return this.http.get(url)
    .map((wuWeather: any) => {
      return this._convertWuWeatheeToCurrentConditions(wuWeather);
    });
  }


  getForecastForLocation(location: Coords): Observable<Forecast>  {



  }

  // getDailyWeatherForCity(city: string): Observable<CurrentConditions> {
  //
  //   return Observable.of(DEFAULT_CURRENT_CONDITIONS);
  //
  // }


}
