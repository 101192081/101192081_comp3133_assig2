import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

const GET_BOOKINGS = gql`query getBooking($userID: ID!){
  booking(user_id: $userID){
      hotel_id
      booking_date
      booking_start
      booking_end
      user_id
  }
}`;

const GET_HOTEL = gql`query getHotel($id: ID!){
  hotel(id: $id){
      hotel_id
      hotel_name
  }
}`;

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  loading: boolean;
  noBookings: boolean;
  bookings: any;
  hotels: any;

  constructor(private router: Router, private apollo: Apollo) {
    if(sessionStorage.getItem("username") == undefined)
      this.router.navigate([''])
    this.loading = true;
    this.noBookings = false;
   }

  ngOnInit(): void {
    let userID = sessionStorage.getItem("userID")
    this.apollo.watchQuery<any>({
      query: GET_BOOKINGS,
      variables: {
        userID: userID
      }
    })
    .valueChanges
    .subscribe(({ data, loading }) => {
      this.loading = loading;
      this.bookings = data.booking;
      if(data.booking.length == 0)
        this.noBookings = true;
      else{
        this.getHotels();
        this.noBookings = false;
      }
    });
  }

  getHotels(){
  this.hotels = {
    hotel: [{}]
  }

  for(let x=0;x<this.bookings.length;x++){
    this.apollo.watchQuery<any>({
      query: GET_HOTEL,
      variables: {
        id: this.bookings[x].hotel_id
      }
    })
    .valueChanges
    .subscribe(({ data }) => {
      let hotel = data.hotel[0]
      this.hotels["hotel"].push({hotel})
    });
  }
  }

  getHotelName(num: number):string{
    let name = "";
    for(let x=1;x<this.hotels.hotel.length;x++){
      if(this.hotels.hotel[x].hotel.hotel_id == num){
        name = this.hotels.hotel[x].hotel.hotel_name
        break;
      }
    }
    return name
  }

  refresh():void{
    window.location.reload();
  }

}
