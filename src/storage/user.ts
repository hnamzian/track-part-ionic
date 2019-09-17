import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../models/User';

@Injectable()
export class UserStorage {
  constructor(public storage: Storage) {}

  async setUser(user: User) {
    await this.storage.ready();
    const result = await this.storage.set('User', user);
    return result;
  }

  async getUser() {
    await this.storage.ready();
    const user = await this.storage.get('User');
    return user;
  }
}
