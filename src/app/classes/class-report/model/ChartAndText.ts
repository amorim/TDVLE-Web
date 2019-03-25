import {ReportFeatures} from "./ReportFeatures";

export class ChartAndText extends ReportFeatures {
  getReportFeatures() {
    return new window['moduleLoader'].loadFeatures('Chart', 'Text');
  }

}
