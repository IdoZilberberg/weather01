import {CurrentConditions} from "../models/current-conditions.model";
import {Forecast} from "../models/forecats.model";
import {Coords} from "../models/coords.model";

export const GOOGLE_API_KEY = 'AIzaSyC40A5DlwkSPbZRsIAV9W4-8czO_KZDs5Q';

export const DEFAULT_PLACE = {
  locality: 'Netanya',
  country: 'Israel',
  coords: <Coords>{
    lat: 32.30,
    lng: 34.87
  }
};

export const DEFAULT_CURRENT_CONDITIONS: CurrentConditions = {

  coords: <Coords>{
    lat: 32.30,
    lng: 34.87
  },
  date: '2018-01-01',
  measurementTime: '2018-01-01T12:00:00.000Z',
  temp: -5,
  feelsLike: -9,
  dewPoint: -12,
  relativeHumidity: 85,
  precipitationToday: 12,
  icon: 'snow',
  iconUrl: 'http://icons.wxug.com/i/c/k/snow.gif'
};

export const DEFAULT_FORECASTS: Forecast[] = [

  {
    targetDate: '2018-01-02',
    targetTime: '2018-01-02T01:00:00.000',
    coords: <Coords>{
      lat: 32.30,
      lng: 34.87
    },
    station: 'mockstation',
    tempHigh: -18,
    tempLow: -22,
    conditions: 'Haze',
    icon: 'snow',
    iconUrl: 'http://icons.wxug.com/i/c/k/snow.gif',
    rainDay: 3,
    rainNight: 5,
    windSpeed: 12,
    windDirection: 'ESE'
  },
  {
    targetDate: '2018-01-03',
    targetTime: '2018-01-03T01:00:00.000',
    coords: <Coords>{
      lat: 32.30,
      lng: 34.87
    },
    station: 'mockstation',
    tempHigh: -15,
    tempLow: -19,
    conditions: 'Snow',
    icon: 'snow',
    iconUrl: 'http://icons.wxug.com/i/c/k/snow.gif',
    rainDay: 0,
    rainNight: 0,
    snowDay: 3,
    snowNight: 8,
    windSpeed: 26,
    windDirection: 'E'
  },
  {
    targetDate: '2018-01-04',
    targetTime: '2018-01-04T01:00:00.000',
    coords: {
      lat: 32.30,
      lng: 34.87
    },
    station: 'mockstation',
    tempHigh: 3,
    tempLow: -7,
    conditions: 'Slush',
    icon: 'snow',
    iconUrl: 'http://icons.wxug.com/i/c/k/fog.gif',
    rainDay: 2,
    rainNight: 0,
    snowDay: 0,
    snowNight: 5,
    windSpeed: 7,
    windDirection: 'N'
  }
];
