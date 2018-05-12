import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule, MatPaginator, MatPaginatorModule, MatSidenavModule,
  MatSnackBarModule, MatToolbarModule, MatTooltipModule,
  MatTabsModule, MatDialogModule, MatProgressBar, MatProgressBarModule, MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSelectModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
