import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar';
import { LoaderComponent } from './components/loader/loader';

@NgModule({
  imports: [
    CommonModule,
    NavbarComponent,
    LoaderComponent
  ],
  exports: [
    NavbarComponent,
    LoaderComponent
  ]
})
export class SharedModule {}