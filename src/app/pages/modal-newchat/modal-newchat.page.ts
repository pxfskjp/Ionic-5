import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-newchat',
  templateUrl: './modal-newchat.page.html',
  styleUrls: ['./modal-newchat.page.scss'],
})

export class ModalNewchatPage implements OnInit {
  userData: any;
  modalData: any;
  session: any;

  constructor(
    private router: Router,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) { 
     this.session = localStorage.getItem('loggedIn') 
  }

  ngOnInit() {
    this.modalData = this.navParams.data;
  }

  openChat(usr: any){
    this.closeModal();
    this.router.navigate(['/chat-room/'], { queryParams: usr, skipLocationChange: false });
  }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
