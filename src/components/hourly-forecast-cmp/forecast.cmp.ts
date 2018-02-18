import {Component, Input} from "@angular/core";
import {Forecast} from "../../models/forecats.model";

@Component({
  selector: 'w-forecast',
  templateUrl: 'forecast.html'
})
export class ForecastComponent {

  @Input() forecast: Forecast;

  // constructor(private util: UtilService) {
  // }


}
