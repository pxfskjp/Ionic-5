import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loader: boolean = false;
  user: any;
  db: any;
  admin: boolean = true;

  constructor(
    private snack: SnackbarService,
    private router: Router
  ) {
    
  }

  configApp() {
    firebase.initializeApp(environment.firebase);
    this.db = firebase.firestore();//firebase.database();
  }

  signin(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=>{
      this.loader = false;
      
      this.user = {
        id: email.substring(0, email.indexOf('@')).toLowerCase()
      };

      localStorage.setItem('loggedIn', this.user.id); 
      this.admin ? this.router.navigate(['/home'], { skipLocationChange: false }) : this.router.navigate(['/chat-room/'], { queryParams: { name: 'Messenger', id: this.user.id }, skipLocationChange: false });
      console.log('login', user);
    })
    .catch((error)=> {
      // Handle Errors here.
      this.loader = false;
      console.log('error while signin', error);
      this.snack.openSnackBar(error.message, 'ok');
      // ...
    });
    
  }

  signUp(name: string, email: string, password: string) {
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user)=>{
      this.loader = false;

      this.user = {
        name: name,
        id: email.substring(0, email.indexOf('@')).toLowerCase()
      };
      localStorage.setItem('loggedIn', this.user.id); 
      
      // create user list on firebase
      this.db.collection("users").doc(this.user.id).set({
        name: name,
        id: this.user.id
      });

      this.router.navigate(['/chat-room/'], { queryParams: { name: 'Messenger', id: this.user.id }, skipLocationChange: false })
      console.log('register', user);
    })
    .catch((error)=> {
      // Handle Errors here.
      this.loader = false;
      console.log('error while signup', error);
      this.snack.openSnackBar(error.message, 'ok');
      // ...
    });
  }

  signOut(){
    firebase.auth().signOut().then(()=> {
      this.user = {};
      localStorage.removeItem('loggedIn');
      this.router.navigate(['/login'], { skipLocationChange: false });
      
    }).catch((error)=> {
      console.log('error while logout', error);
    });
    
  }

  sendMsg(id: string, to:string, from:string, msg: string, type: string) {
    let key = this.generateRandomString(16);
    this.db.collection("chatRoom/").doc(key).set({
      type: type,
      to: (to) ? to : 'admin',
      from: (from) ? from : 'admin',
      id: id,
      key: key,
      msg: msg,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    
  }

  generateRandomString(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
}
