import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {Coords} from "../models/coords.model";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";
import {CurrentConditions} from "../models/current-conditions.model";
import moment from 'moment';
import {Forecast} from "../models/forecats.model";

const WU_KEY = '189ac1342315df89';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  _convertWuHourlyForecastToForecast(coords: Coords, wuHourlyForecast: any): Forecast  {

    const targetTime = moment(wuHourlyForecast.FCTTIME.epoch * 1000);

    const forecast: Forecast = {
      targetDate: targetTime.toISOString().substr(0, 10),
      targetDateDisplay: targetTime.format('ddd D/M'),
      targetTimeDisplay: targetTime.format('H:mm'),
      // targetTimeDisplay: targetTime.fromNow(),
      coords: coords,
      temp: wuHourlyForecast.temp.metric,
      feelsLike: wuHourlyForecast.feelslike,
      dewPoint: wuHourlyForecast.dewpoint,
      conditions: wuHourlyForecast.condition,
      icon: wuHourlyForecast.icon,
      iconUrl: wuHourlyForecast.icon_url,
      humidity: wuHourlyForecast.humidity,
      rain: wuHourlyForecast.qpf.metric,
      snow: wuHourlyForecast.snow.metric,
      windDirection: wuHourlyForecast.wdir.dir,
      windSpeed: wuHourlyForecast.wspd.metric
    };

    return forecast;


  }

  _convertWuForecastToForecast(coords: Coords, wuForecast: any): Forecast {

    const targetTime = moment(wuForecast.date.epoch * 1000);

    const forecast: Forecast = {
      targetDate: targetTime.toISOString().substr(0, 10),
      targetDateDisplay: targetTime.format('ddd D/M'),
      targetTimeDisplay: targetTime.format('H:mm'),
      coords: coords,
      tempHigh: wuForecast.high.celsius,
      tempLow: wuForecast.low.celsius,
      conditions: wuForecast.conditions,
      icon: wuForecast.icon,
      iconUrl: wuForecast.icon_url,
      rainDay: wuForecast.qpf_day.mm || 0,
      rainNight: wuForecast.qpf_night.mm || 0,
      snowDay: wuForecast.snow_day.mm || 0,
      snowNight: wuForecast.snow_night.mm || 0,
      windSpeed: wuForecast.avewind.kph,
      windDirection: wuForecast.avewind.dir
    };

    return forecast;

  }

  _convertWuWeatherToCurrentConditions(wuWeather: any): CurrentConditions {

    // return DEFAULT_CURRENT_CONDITIONS;
    if(!wuWeather || !wuWeather.current_observation)  {
      return null;
    }

    const current = wuWeather.current_observation;
    const now = moment(current.local_epoch * 1000);
    const res = <CurrentConditions>{
      date: now.toISOString().substr(0, 10),
      measurementTime: now.toISOString(),
      // country: current.display_location.state_name,
      // city: current.display_location.city,
      coords: {
        lat: current.observation_location.latitude,
        lng: current.observation_location.longitude
      },
      icon: current.icon,
      iconUrl: current.icon_url,
      station: current.observation_location.full,
      feelsLike: current.feelslike_c,
      temp: current.temp_c,
      weather: current.weather,
      relativeHumidity: current.relative_humidity,
      dewPoint: current.dewpoint_c,
      precipitationToday: current.precip_today_metric === '--' ? 0 : current.precip_today_metric,
      pressure: current.pressure_mb
    };
    return res;
  }

  getCurrentConditionsForLocation(coords: Coords): Observable<CurrentConditions> {

    const url = `http://api.wunderground.com/api/${WU_KEY}/conditions/q/${coords.lat},${coords.lng}.json`;

    // return Observable.of(null)

    return this.http.get(url)
    .map((wuCurrentConditions: any) => {
      return this._convertWuWeatherToCurrentConditions(wuCurrentConditions);
    });
  }

  getHourlyForecastsForLocation(coords: Coords): Observable<Forecast[]>  {
    const url = `http://api.wunderground.com/api/${WU_KEY}/hourly/q/${coords.lat},${coords.lng}.json`;
    console.log(`Getting hourly forecast: ${url}`);

    return this.http.get(url)
    .map((wuForecastResult: any) => {

      const wuForecasts: any[] = wuForecastResult.hourly_forecast;

      const forecasts: Forecast[] = wuForecasts.map(wuForecast => this._convertWuHourlyForecastToForecast(coords, wuForecast));


      return forecasts;
    });

  }


  getForecastsForLocation(coords: Coords): Observable<Forecast[]>  {

    const url = `http://api.wunderground.com/api/${WU_KEY}/forecast/q/${coords.lat},${coords.lng}.json`;

    console.log(`Getting forecast: ${url}`);
    // http://api.wunderground.com/api/189ac1342315df89/forecast/q/32.30,34.89.json

    return this.http.get(url)
    .map((wuForecastResult: any) => {

      const wuForecasts: any[] = wuForecastResult.forecast.simpleforecast.forecastday;

      const forecasts: Forecast[] = wuForecasts.map(wuForecast => this._convertWuForecastToForecast(coords, wuForecast));


      return forecasts;
    });


  }

  // getDailyWeatherForCity(city: string): Observable<CurrentConditions> {
  //
  //   return Observable.of(DEFAULT_CURRENT_CONDITIONS);
  //
  // }


}
