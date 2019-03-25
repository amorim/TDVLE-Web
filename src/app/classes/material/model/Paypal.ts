import {PaymentMethod} from "./PaymentMethod";

export class Paypal extends PaymentMethod {

  url = 'sandbox.paypal.com';
  redirectorService = {"redirector": "injectable"};

  pay() {
    return this.redirectorService['redirect'].toPaypal();
  }

}
