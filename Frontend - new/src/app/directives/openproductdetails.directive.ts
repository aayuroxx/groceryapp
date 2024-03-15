import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appOpenproductdetails]'
})
export class OpenproductdetailsDirective {
  @Input() productId: number = 0;
  @HostListener('click') openProductDetails() {
    window.scrollTo(0, 0);
    this.Router.navigate(['/product-details'], {
      queryParams: {
        id: this.productId,
      },
    });
  }
  constructor(private Router: Router) { }

}
