import { Component, OnInit } from '@angular/core';
import {ClassService} from "../class.service";
import { saveAs } from 'file-saver';
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {DecimalPipe} from "@angular/common";
import {decimalChecker} from "@swimlane/ngx-charts";
import {MatSnackBar} from "@angular/material";


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  loading = true;
  loadingBoleto = false;
  classes = [];
  selectedClass: any = {};
  dinherao = '';
  finalValue = '';
  decimalPipe: DecimalPipe;
  costByClass = {};

  constructor(private classService: ClassService, private snackBar: MatSnackBar) {
    classService.getClasses(10000, 0).subscribe((c: any[]) => {
      this.classes = c;
      this.selectedClass = this.classes[0];
      this.loading = false;
      for (let c of this.classes)
        this.costByClass[c.id + ''] = Math.random() * 2000;
      this.changedClass();
    });
    this.decimalPipe = new DecimalPipe("en-US");
  }

  ngOnInit() {
    this.initPaypalConfig();
  }

  private initPaypalConfig() {
    this.payPalConfig = {
      currency: 'BRL',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'BRL',
              value: this.finalValue.replace(",", ""),
              breakdown: {
                item_total: {
                  currency_code: 'BRL',
                  value: this.finalValue.replace(",", "")
                }
              }
            },
            items: [
              {
                name: 'Books and School Supplies for Class ' + this.selectedClass.name,
                quantity: '1',
                category: 'PHYSICAL_GOODS',
                unit_amount: {
                  currency_code: 'BRL',
                  value: this.finalValue.replace(",", ""),
                },
              }
            ]
          }
        ]
      },
      advanced: {
        updateOrderDetails: {
          commit: true
        }
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {

        this.snackBar.open("Transaction Approved", "Dismiss", {duration: 1000});
        actions.order.get().then(details => {

        });
      },
      onClientAuthorization: (data) => {

        this.snackBar.open("Transaction authorized. We'll proceed with your order.", "Dismiss", {duration: 5000});
      },
      onCancel: (data, actions) => {

        this.snackBar.open("You canceled the payment", "Dismiss", {duration: 3000});
      },
      onError: err => {

      },
      onClick: () => {
        this.snackBar.open("Redirecting to PayPal", "Dismiss", {duration: 1000});
      },
    };
  }


  geraBoleto() {
    this.loadingBoleto = true;
    this.snackBar.open("Please wait while we generate the Boleto", "Dismiss", {duration: 3000});
    this.classService.generateBoletao({value: this.finalValue.replace(",", "")}).subscribe(b => {
      let boleto = new Blob([b], { type: 'application/pdf' });
      saveAs(boleto, 'boleto.pdf');
      this.snackBar.open("Boleto download in progress", "Dismiss", {duration: 4000});
      this.loadingBoleto = false;
    });
  }

  changedClass() {
    this.dinherao = '';
    this.finalValue = this.decimalPipe.transform(this.costByClass[this.selectedClass.id + ''], '2.2-2') + '';
  }

  changedValue($event) {
    if ($event)
      this.dinherao = $event;
    this.finalValue = this.decimalPipe.transform((parseFloat(this.dinherao) || 0.00) + this.costByClass[this.selectedClass.id + ''], '2.2-2') + '';
  }
}
