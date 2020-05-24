import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from "@angular/material";
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatProgressSpinnerModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    MatTooltipModule,
  ],
  exports:[
    Material.MatToolbarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatProgressSpinnerModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    MatTooltipModule,
  ]
})
export class MaterialModule { }
