import {PaymentMethod} from "./PaymentMethod";

export class Boleto extends PaymentMethod {

  url = 'the-dank-network.herokuapp.com/api/generateBoleto';
  // Injectable
  redirectorService = {"redirector": "injectable"};

  pay() {
    return this.redirectorService['redirect'].toBoleto();
  }

}
