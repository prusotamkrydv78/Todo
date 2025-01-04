import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginUserService {
  constructor() {}

  loginUser: any = {
    username:''
  }
  isRegisterMode:boolean=false
}
