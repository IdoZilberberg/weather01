import {CurrentConditions} from "../models/current-conditions.model";

export const GOOGLE_API_KEY = 'AIzaSyC40A5DlwkSPbZRsIAV9W4-8czO_KZDs5Q';

export const DEFAULT_CURRENT_CONDITIONS: CurrentConditions = {

  place:  {
    locality: 'Netanya',
    country: 'Israel',
    coords: {
      lat: 32.30,
      lng: 34.87
    }
  },
  date: '2018-01-01',
  measurementTime: '2018-01-01T12:00:00.000Z',
  temp: 19,
  dewPoint: 11,
  relativeHumidity: 65,
  precipitationToday: 0
};
