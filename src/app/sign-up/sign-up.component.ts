import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() {
  }
  
  createUser(){
    console.log("here")

    //console.log(form.value);
  }

  ngOnInit(): void {
  }

}
