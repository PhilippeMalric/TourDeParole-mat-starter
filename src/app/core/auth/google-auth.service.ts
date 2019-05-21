import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { User } from '@app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  public authState: any;
  public user$: Observable<firebase.User>;
  logedIn: boolean;

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user$ = afAuth.authState;

    if (this.user$) {
      this.logedIn = true;
    } else {
      this.logedIn = false;
    }
  }

  logout() {
    const uid = this.afAuth.auth.currentUser.uid;
    const status = 'offline';
    this.setStatus(uid, status);
    this.authState = null;
    this.afAuth.auth.signOut().then(() => this.router.navigate(['/']));
  }

  setStatus(uid: string, status: string) {
    const path = 'users/' + uid;
    const data = {
      status
    };
    this.db.object(path).update(data);
  }
  googleSignIn() {
    const provider = new auth.GoogleAuthProvider().addScope('email');
    this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider) {
    const credential: any = await this.afAuth.auth.signInWithPopup(provider);

    console.log('displayName');
    console.log(credential.user.displayName);
    console.log('credential.user.displayName');
    console.log(credential.user.uid);
    console.log('credential');
    console.log(credential);
    this.updateUserData({
      uid: credential.user.uid,
      email: credential.additionalUserInfo.profile.email,
      displayName: credential.user.displayName,
      photoURL: ''
    });
    const status = 'online';
    this.setUserData(
      credential.additionalUserInfo.profile.email,
      credential.user.displayName,
      status,
      credential.user.uid
    );
    this.authState = credential;
  }

  private updateUserData({ uid, email, displayName, photoURL }: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, { merge: true });
  }
  setUserData(email: string, displayName: string, status: string, uid) {
    const path = `users/${uid}`;
    const data = {
      status
    };
    this.db.object(path).update(data);
  }
}
