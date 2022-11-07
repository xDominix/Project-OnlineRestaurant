import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from as fromPromise, map,} from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: AngularFirestoreCollection<any>;
  private users:Observable<User[]>;

  private currRole='guest';

  constructor(public afs:AngularFirestore,private authService:AuthService) {
    this.userCollection = this.afs.collection('users');

    this.authService.getUid().subscribe(uid=>{
      if(uid){this.getUser(uid).subscribe(user=>{ 
        if(user.get('role')!==undefined){this.currRole=user.get('role')} else this.currRole = 'undef';
      })}
      else 
      this.currRole = 'guest';
    });

    this.users = this.userCollection.snapshotChanges().pipe(map(actions => {       
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        data.uid =  a.payload.doc.id;
        return data;
      });
    }));
   }
   
    getUser(uid:string):Observable<firebase.default.firestore.DocumentSnapshot<User>>
   {
      return this.userCollection.doc(uid).get();
   };

   getUsers()
   {
     return this.users;
   }

   changeRole(uid:string,role:string)
   {
     this.userCollection.doc(uid).update({role:role});
   }

   getRole()
   {
     return this.currRole;
   }

}

