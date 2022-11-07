import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.css']
})
export class PaginationBarComponent {

  @Input() numOfItems = 0;

  itemsPerPage=12;
  currPage = 1;
  get maxPage() {return Math.floor((this.numOfItems-1)/this.itemsPerPage)+1}

  @Output() onPageChange = new EventEmitter<{startIndex:number,endIndex:number}>();

  setItemsPerPage(e:any)
  {
    if(e.target.value!==null)
    {
      this.itemsPerPage=Number(e.target.value);
      this.currPage=1;
      this.setPage();
    }
  }

  firstPage()
  {
    this.currPage =1;
    this.setPage();
  }

  previousPage()
  {
    this.currPage--;
    this.setPage();
  }

  nextPage()
  {
    this.currPage++;
    this.setPage();
  }

  lastPage()
  {
    this.currPage=this.maxPage;
    this.setPage();
  }

  setPage()
  {
    this.onPageChange.emit({startIndex:(this.currPage-1)*this.itemsPerPage,endIndex:(this.currPage-1)*this.itemsPerPage+this.itemsPerPage});
  }
  

  buttonDisabled(prevButton:boolean)
  {
    return prevButton? this.currPage==1:this.currPage==this.maxPage;
  }



}
