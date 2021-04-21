import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { GraphQLModule } from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import { BookingListComponent } from './booking-list/booking-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    HotelListComponent,
    BookingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'http://localhost:4000/graphql',
        }),
      };
    },
    deps: [HttpLink],
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
