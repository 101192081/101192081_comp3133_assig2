import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

const GET_HOTELS = gql`query getHotel {
  hotel{
      hotel_id
      hotel_name
      street
      city
      postal_code
      price
      email
      user_id
  }
}`;

const GET_HOTELSNAME = gql`query getHotel($name: String!){
  hotel(name: $name){
      hotel_id
      hotel_name
      street
      city
      postal_code
      price
      email
      user_id
  }
}`;

const GET_HOTELSCITY = gql`query getHotel($city: String!){
  hotel(city: $city){
      hotel_id
      hotel_name
      street
      city
      postal_code
      price
      email
      user_id
  }
}`;

const POST_BOOK = gql`mutation addBooking($hotel_id: ID!, $booking_date: String!, $booking_start: String!, $booking_end: String!, $user_id: ID!){
  addBooking(hotel_id: $hotel_id, booking_date: $booking_date, booking_start: $booking_start, booking_end: $booking_end, user_id: $user_id){
    hotel_id
    booking_date
    booking_start
    booking_end
    user_id
  }
}`;

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit, OnDestroy {
  loading: boolean;
  noHotels: boolean;
  hotels: any;

  constructor(private router: Router, private apollo: Apollo) {
    if(sessionStorage.getItem("username") == undefined)
      this.router.navigate([''])
    this.loading = true;
    this.noHotels = false;
   }

  ngOnInit(): void {
    this.getAllHotels();
  }

  getAllHotels(){
    this.apollo.watchQuery<any>({
      query: GET_HOTELS
    })
    .valueChanges
    .subscribe(({ data, loading }) => {
      this.loading = loading;
      this.hotels = data.hotel;
      if(data.hotel.length == 0)
        this.noHotels = true;
      else
        this.noHotels = false;
    });
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate([''])
  }

  book(hotel_id: any){
    var date = new Date();
    var bDate = new Date();
    var sDate = new Date(date.setDate(date.getDate() + 7));
    var eDate = new Date(date.setDate(date.getDate() + 7));
    this.apollo.mutate({
      mutation: POST_BOOK,
      variables: {
        hotel_id: hotel_id,
        booking_date: ""+bDate,
        booking_start: ""+sDate,
        booking_end: ""+eDate,
        user_id: sessionStorage.getItem("userID")
      }}).subscribe(({ data }) => {
        alert("Hotel Booked");
      },(error) => {
        alert("Failed to book hotel")
        console.log('there was an error sending the query', error);
      });
  }

  onSubmit(searchForm:NgForm):void{
    if(searchForm.value.searchType == "Name"){
      this.apollo.watchQuery<any>({
        query: GET_HOTELSNAME,
        variables: {
          name: searchForm.value.search
        }
      })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.hotels = data.hotel;
        if(data.hotel.length == 0)
          this.noHotels = true;
        else
          this.noHotels = false;
      });
    }
    else{
      this.apollo.watchQuery<any>({
        query: GET_HOTELSCITY,
        variables: {
          city: searchForm.value.search
        }
      })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.hotels = data.hotel;
        if(data.hotel.length == 0)
          this.noHotels = true;
        else
          this.noHotels = false;
      });
    }
  }

  refresh():void{
    window.location.reload();
  }

  ngOnDestroy(): void{

  }

}