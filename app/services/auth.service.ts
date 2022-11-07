import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from as fromPromise, map, Observable,of, switchMap} from 'rxjs';
import * as firebase from 'firebase/compat/app'
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
 userData:Observable<firebase.default.User|null>;
 userCollection: AngularFirestoreCollection<any>;

  currUid='';

  constructor(private afAuth:AngularFireAuth,private afs:AngularFirestore,private router:Router) {  
    this.userData = this.afAuth.user;
    this.userCollection = this.afs.collection('users');
    
    this.userData.pipe(map(user => user && user.uid)).subscribe(uid=>{uid?this.currUid=uid:this.currUid=''});
  }

  login(email:string,password:string)
  {
   this.afAuth.setPersistence(firebase.default.auth.Auth.Persistence.SESSION).then(_ => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(user=>{this.router.navigate(['/home'])}).catch( ()=>alert("Wrong email or password"));
      },
      )
  };

  register(name:string,lastname:string,email:string,password:string)
  {
    this.afAuth.createUserWithEmailAndPassword(email,password).then( 
      user=> {
        if(user.user?.uid)
        this.userCollection.doc(user.user.uid).set({
          name : name,
          lastname:lastname,
          email:email,
          role:'user',
       }).catch(function(error) {
        alert(error)

      });
      this.router.navigate(['/home']);
      }
      
    ).catch(_=>{
      alert("Email already exists.")});
  }

  logout()
  {
    this.afAuth.signOut();
    this.router.navigate(['/home']);
  }

  isAuthenticated()
  {
    return this.userData.pipe(map(user => user && user.uid !== undefined));
  }

  getUid()
  {
    return this.userData.pipe(map(user => user && user.uid));
  }
  
}
