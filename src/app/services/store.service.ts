import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    public storage: Storage
  ) { }

  set(key: string, value: any) {
    this.storage.set(key, value);
  }
  async get(key: string) {
    return await this.storage.get(key);
  }
}
