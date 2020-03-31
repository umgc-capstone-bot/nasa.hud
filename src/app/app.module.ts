import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { InitialStepComponent } from './initial-step/initial-step.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ProcedureTaskComponent } from './task-step/task-step.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AppComponent, InitialStepComponent, ProcedureTaskComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatCheckboxModule,
    MatChipsModule,
    FlexLayoutModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
