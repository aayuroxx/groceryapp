import { Component, OnInit  } from '@angular/core';
import { FormControl} from '@angular/forms';
import { Cart, Order, Payment, PaymentMethod } from '../models/models';
import { UtilityService } from '../services/utility.service';
import { NavigationService } from '../services/navigation.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  selectedPaymentMethodName = 'a';
  selectedPaymentMethod = new FormControl('0');
  PaymentMethods: PaymentMethod[] = [];
  message = '';
  displaySpinner = false;
  classname = '';
  usersCart: Cart = {
    id: 0,
    user: this.utilityService.getUser(),
    cartItems: [],
    ordered: false,
    orderedOn: '',
  };
  usersPaymentInfo: Payment = {
    id: 0,
    user: this.utilityService.getUser(),
    paymentMethod: {
      id: 0,
      type: '',
      provider: '',
      available: false,
      reason: '',
    },
    totalAmount: 0,
    amountPaid: 0,
    createdAt: '',
  };

  constructor(private navigationService: NavigationService,
    public utilityService :UtilityService,
    private router: Router){

  }
  ngOnInit(): void {
    this.selectedPaymentMethod.valueChanges.subscribe((res: any) => {
      if (res === '0') this.selectedPaymentMethodName = '';
      else this.selectedPaymentMethodName = res.toString();
    });
    this.navigationService
    .getActiveCartOfUser(this.utilityService.getUser().id)
    .subscribe((res: any) => {
      this.usersCart = res;
      this.utilityService.calculatePayment(res, this.usersPaymentInfo);
    });
  }
  placeOrder() {
    this.displaySpinner = true;
    let isPaymentSuccessfull = this.payMoney();

    if (!isPaymentSuccessfull) {
      this.displaySpinner = false;
      this.message = 'Something went wrong! Payment did not happen!';
      this.classname = 'text-danger';
      return;
    }

    let step = 0;
    let count = timer(0, 3000).subscribe((res) => {
      ++step;
      if (step === 1) {
        this.message = 'Processing Payment';
        this.classname = 'text-success';
      }
      if (step === 2) {
        this.message = 'Payment Successfull, Order is being placed.';
        
        
      }
      if (step === 3) {
        this.message = 'Your Order has been placed';
        this.displaySpinner = false;
      }
      if (step === 4) {
       
        this.router.navigateByUrl('/home');
        count.unsubscribe();
        
      }
    });
  }

  payMoney() {
    return true;
  }
}
