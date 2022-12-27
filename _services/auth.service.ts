import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private http:HttpClient) { }

  isAuthenticated(){
    if(sessionStorage.getItem('token')!==null){
      return true;
    }
      return false;
  }

  canAccess(){
    if(!this.isAuthenticated()){
      this.router.navigate(['/login']);
    }
    
    
  }
  
  
  register(name:string,email:string,password:string)
  {
     return this.http.post<{idToken:string}>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArSekB82iruaYwjcgOzpMBsiYx4gu7cbc',
    {displayName:name,email,password}
    
    );

  }
  storeToken(token:string){
    sessionStorage.setItem('token',token);
  }
  login(email:string,password:string){
    return this.http.post<{idToken:string}>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArSekB82iruaYwjcgOzpMBsiYx4gu7cbc',
   {email,password} );

  }
  canAuthenticate(){
    
    if(this.isAuthenticated()){
      this.router.navigate(['/dashboard']);
    }
    
  }
  detail(){
    let token= sessionStorage.getItem('token');
    return this.http.post<{users:Array<{localId:string,displayName:string}>}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyArSekB82iruaYwjcgOzpMBsiYx4gu7cbc',
      {idToken:token}

    )
  }
  removeToken(){
    sessionStorage.removeItem('token');
  }
}
