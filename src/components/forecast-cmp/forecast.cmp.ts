import {Component, Input} from "@angular/core";
import {UtilService} from "../../services/util.service";
import {Forecast} from "../../models/forecats.model";

@Component({
  selector: 'w-forecast',
  templateUrl: 'forecast.html'
})
export class ForecastComponent {

  @Input() forecast: Forecast;

  constructor(private util: UtilService) {
  }


}
