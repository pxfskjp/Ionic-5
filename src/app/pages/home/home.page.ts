import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Router } from '@angular/router';
import { QueryValueType } from '@angular/compiler/src/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usersList: any;
  now: Date = new Date();
  
  constructor(
    private api: ApiService,
    private router: Router
  ) { 
    this.getUsersList();

    
  }

  ngOnInit() {
  }

  logout() {
    this.api.signOut();
  }

  getUsersList() {
    this.api.db.collection("users")
    .onSnapshot((querySnapshot)=> {
      this.usersList=[];
      querySnapshot.forEach((doc) =>{
        this.api.db.collection("chatRoom")
          .where("id", "==", doc.id) 
          .orderBy("timestamp", "desc")
          .limit(1)
          .onSnapshot((querySnapshot)=> {
              querySnapshot.forEach((result) => {
                this.usersList.push({
                  user: doc.data(),
                  lastMSG: result.data()
                });
              });
          });
      });
    });
  }

  openChat(usr: any){
    this.router.navigate(['/chat-room/'], { queryParams: usr, skipLocationChange: false });
  }

  chatTime(message: any) {
    return this.api.formatAMPM(message.toDate());
  }

}
