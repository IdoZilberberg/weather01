import {Component, Input} from "@angular/core";
import {Forecast} from "../../models/forecats.model";

@Component({
  selector: 'w-hourly-forecast',
  templateUrl: 'hourly-forecast.html'
})
export class HourlyForecastComponent {

  @Input() forecast: Forecast;

  // constructor(private util: UtilService) {
  // }


}
