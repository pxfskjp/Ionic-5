import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {
  user: any;
  chat: string;
  unsubscribe: any;
  messages: any = [];
  chatKeys: any = [];
  session: any;
  loader: boolean = true;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.queryParamMap.subscribe(snap => { 
      this.user = snap['params'];
      this.getChat();
    });
    this.session = localStorage.getItem('loggedIn') 
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/home'], { replaceUrl : true, skipLocationChange: false });
  }

  logout() {
    this.api.signOut();
  }
  
  sendChat() {
    this.chat ? console.log(this.chat) : '';

    if(this.chat){
      this.api.sendMsg(this.user.id, this.user.id, this.session, this.chat);
    }

    this.chat = '';
  }

  getChat() {
    // retrieve as receiver message
    this.api.db.collection("chatRoom")
      .where('id', 'array-contains',this.session)
      .onSnapshot((querySnapshot)=> {
        this.loader = false;
        querySnapshot.forEach((doc)=> {
            // doc.data() is never undefined for query doc snapshots
            let data = doc.data();

            if ((data.from == this.user.id && data.to == this.session) || 
                (data.from == this.session && data.to == this.user.id)) {
              if(this.chatKeys.indexOf(data.key) < 0){
                this.messages.push(data);
                this.chatKeys.push(data.key);
              };
            };
        });
        this.messages.sort(this.sortDate);
      });
  }

  sortDate(a, b) {  
    var dateA = new Date(a.timestamp.toDate()); 
    var dateB = new Date(b.timestamp.toDate()); 
    return dateA > dateB ? 1 : -1;  
  };


  ionViewWillLeave() {
    // this.api.admin ? this.unsubscribe() : '';
    console.log('unsubscribe successfully');
  }

  formatDate(message: any) {
    let date = message['timestamp'] ? message['timestamp'].toDate() : new Date();
    return this.api.formatAMPM(date);
  }
}
