import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formdata={email:"",password:""};
  submit=false;
  loading=false;
  errorMessage="";

  constructor(private auth:AuthService) { }

  ngOnInit(): void { this.auth.canAuthenticate();
  }
  onSubmit(){

    this.loading=true;
    console.log(this.formdata);
    this.auth.login(this.formdata.email,this.formdata.password)
    .subscribe({
      next: data=>{
        this.auth.storeToken(data.idToken);
        console.log('logged user token is '+data.idToken);
        this.auth.canAuthenticate();
      },
      error:data=>{
        if(data.error.error.message=="INVALID PASSWORD"||data.error.error.message=="INVALID EMAIL"){
          this.errorMessage="Invalid Credentials";
        }
        else{
          this.errorMessage="Unknown Error when is Logging in"
        }
      }
    })
    .add(()=>{
      this.loading=false;
      console.log('log in process completed');

    })
  }
}
