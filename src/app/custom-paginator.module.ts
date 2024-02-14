import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomPaginatorComponent } from './custom-paginator.component';

@NgModule({
  declarations: [
    CustomPaginatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CustomPaginatorComponent
  ]
})
export class CustomPaginatorModule { }
