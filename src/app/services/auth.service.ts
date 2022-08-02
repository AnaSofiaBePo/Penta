import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { UserI } from '../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    this.auth.signOut();
  }

  registerUser(dataUser: UserI){
    return this.auth.createUserWithEmailAndPassword(dataUser.name, dataUser.password);
  }
}
