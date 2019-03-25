import {ReportFeatures} from "./ReportFeatures";

export class Chart extends ReportFeatures {
  getReportFeatures() {
    return new window['moduleLoader'].loadFeatures('Chart');
  }

}
