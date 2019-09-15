import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class TokenStorage {
  constructor(public storage: Storage) {}

  async setAuthToken(token) {
    await this.storage.ready();
    const result = await this.storage.set('AuthToken', token);
    return result;
  }

  async getAuthToken() {
    await this.storage.ready();
    const token = await this.storage.get('AuthToken');
    return token;
  }
}
