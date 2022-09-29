import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: Auth, private router: Router) { }

  login(username: any, password: any) {

    return from(signInWithEmailAndPassword(this.auth, username, password))
  }

  logout() {

    return from(this.auth.signOut())
  }

  signUp(name: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe
      (switchMap(({ user }) => updateProfile(user, { displayName: name })))
  }
}
