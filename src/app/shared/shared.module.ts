import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

// Components
import { GridListComponent } from './components/grid-list/grid-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    GridListComponent,
    NavbarComponent,
    PageNotFoundComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    NavbarComponent,
    GridListComponent,
    PageNotFoundComponent
  ]
})
export class SharedModule { }
