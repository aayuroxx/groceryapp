import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { Product } from '../models/models';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  imageIndex:number =1;
  product !: Product;
  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService:NavigationService,
    public utilityService:UtilityService
  ){}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params:any)=>{
      let id = params.id;
      this.navigationService.getProduct(id).subscribe((res: any)=>{
        this.product =res;
      });
    });
  }
}
