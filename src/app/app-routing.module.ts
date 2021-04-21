import { NgModule } from '@angular/core';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import{ BookingListComponent } from './booking-list/booking-list.component'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent},
  { path: 'hotel-list', component: HotelListComponent},
  { path: 'booking-list', component: BookingListComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpLinkModule,
    HttpClientModule]
})
export class AppRoutingModule { }
