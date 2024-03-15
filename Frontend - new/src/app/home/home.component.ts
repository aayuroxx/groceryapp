import { Component, OnInit} from '@angular/core';
import { SuggestedProduct } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  suggestedProducts:SuggestedProduct[]=[
    {
      banerimage:'../../assets/Baner/1.png',
      category:{
        id: 0,
        category:'grocery',
        subCategory:'fruits'
     
      },
     
    },
  ];
  constructor(){}
  ngOnInit(): void {
    
  }
  

}
