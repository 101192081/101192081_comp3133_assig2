import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

const POST_USER = gql`mutation addUsers($userID: ID!, $userName: String!, $password: String!, $email: String!){
  addUser(user_id: $userID, username: $userName, password: $password, email: $email){
      user_id
      username
      password
      email
  }
}`;

const GET_USER = gql`query getUser{
  user{
      user_id
  }
}`;


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userID: number;

  constructor(private router: Router, private apollo: Apollo) {
    this.userID = 0;
    if(sessionStorage.getItem("username") != undefined)
      this.router.navigate(['/hotel-list'])
  }
  
  onSubmit(signupForm:NgForm):void{
    this.apollo.mutate({
      mutation: POST_USER,
      variables: {
        userID: this.userID,
        userName: signupForm.value.username,
        password: signupForm.value.password,
        email: signupForm.value.email
      }}).subscribe(({ data }) => {
        sessionStorage.setItem("userID", ""+this.userID)
        sessionStorage.setItem("username", signupForm.value.username)
        sessionStorage.setItem("email", signupForm.value.email)
        this.router.navigate(['/hotel-list'])
      },(error) => {
        alert("Failed to sign-up")
        console.log('there was an error sending the query', error);
      });
  }

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: GET_USER,})
      .valueChanges.subscribe(({ data }) => {
        this.userID = parseInt(data.user[data.user.length-1].user_id) + 1;
      },(error) => {
        alert("Failed to obtain ID")
        console.log('there was an error sending the query', error);
        this.router.navigate(['/login'])
      });
  }
}
