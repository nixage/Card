import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';

import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowBackCardDirective } from './directive/show-back-card/show-back-card.directive';
import { ShowFrontCardDirective } from './directive/show-front-card/show-front-card.directive';

import { CustomToastComponent } from './custom-toast/custom-toast.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ShowBackCardDirective,
    ShowFrontCardDirective,
    CustomToastComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
