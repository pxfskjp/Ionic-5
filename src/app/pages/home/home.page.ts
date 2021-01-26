import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Router } from '@angular/router';
import { QueryValueType } from '@angular/compiler/src/core';

import { ModalController } from '@ionic/angular';
import { ModalNewchatPage } from '../modal-newchat/modal-newchat.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  session: any;
  usersList: any;
  availableList: any;
  now: Date = new Date();
  
  constructor(
    private api: ApiService,
    private router: Router,
    public modalController: ModalController
  ) { 
    this.getUsersList();  
    this.session = localStorage.getItem('loggedIn') 
  }

  async showModalChat() {
    const modal = await this.modalController.create({
      component: ModalNewchatPage,
      componentProps: { data:this.availableList }
    });
    return await modal.present();
  }

  ngOnInit() {
  }

  logout() {
    this.api.signOut();
  }

  getUsersList() {
    this.api.db.collection("users")
    .onSnapshot((querySnapshot)=> {
      this.usersList     = [];
      this.availableList = [];

      querySnapshot.forEach((doc) =>{
        this.availableList.push(doc.data());
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
