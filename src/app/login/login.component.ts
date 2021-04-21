import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

const GET_USER = gql`query getUser($username: String!){
  user(username: $username){
      user_id
      username
      password
      email
  }
}`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:any;

  constructor(private router: Router, private apollo: Apollo) {
    if(sessionStorage.getItem("username") != undefined)
      this.router.navigate(['/hotel-list'])
  }

  onSubmit(loginForm:NgForm):void{
    this.apollo.watchQuery<any>({
      query: GET_USER,
      variables: {
        username: loginForm.value.username
      }})
      .valueChanges.subscribe(({ data }) => {
        this.user = data;
        if(this.user.user.length == 0){
          return alert("Incorrect Username")
        }
        else if(this.user.user[0].password == loginForm.value.password){
          sessionStorage.setItem("userID", this.user.user[0].user_id)
          sessionStorage.setItem("username", this.user.user[0].username)
          sessionStorage.setItem("email", this.user.user[0].email)
          this.router.navigate(['/hotel-list'])
        }
        else{
          alert("Incorrect Password")
        }
      },(error) => {
        alert("Failed to login")
        console.log('there was an error sending the query', error);
      });
  }

  ngOnInit(): void {
  }

}
