import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';


@NgModule({
  declarations: [SearchBoxComponent, SearchResultsComponent],
  imports: [
    CommonModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
