import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
UserObj:any={
  'Name':'',
  "Number":''
}
constructor(private Router : Router){

}
ngOnInit(){
  localStorage.clear();
}
Submit1(){
  if(!this.UserObj.Name){
    alert('Please Enter Your Name!');
    return;
  }
  if(!this.UserObj.Number){
    alert('Please Enter Your Mobile Number!');
    return;
  }
  localStorage.setItem('user',JSON.stringify(this.UserObj))
  this.Router.navigate(['/home']);
}
}
