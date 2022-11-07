import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {

  @Input() public rating:any;

  setGray(num:any)
  {
    if(this.rating>=num) return false;
    return 'gray';
  }

}
