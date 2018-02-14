export class CurrentConditions  {
  date: string;
  measurementTime: string;
  city: string;
  state?: string;
  country: string;
  temp: number;
  relativeHumidity: number;
  dewPoint?: number;
  precipitationToday: number;
}
