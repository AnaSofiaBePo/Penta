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

  loginP(proveedor: string) {
    if (proveedor === 'google') {
      return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } else {
      this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }
  }

  stateAuth() {
    return this.auth.authState;
  }

  logOut() {
    this.auth.signOut();
  }

  registerUser(dataUser: UserI) {
    return this.auth.createUserWithEmailAndPassword(
      dataUser.email,
      dataUser.password
    );
  }
}
