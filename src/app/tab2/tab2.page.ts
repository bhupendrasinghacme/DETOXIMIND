import { Component } from '@angular/core';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  contactus_data:any;
  constructor(
    private pagesservice:PagesService

  ) {
    this.fetchData();
  }
fetchData(){
this.pagesservice.getPagesData(14155).subscribe(results=>{
console.log(results);
this.contactus_data = results;
console.log(results);
});
}
}
