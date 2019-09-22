import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class PartsStorage {
  constructor(public storage: Storage) {}

  async setParts(parts) {
    await this.storage.ready();
    const result = await this.storage.set('parts', parts);
    return result;
  }

  async getParts() {
    await this.storage.ready();
    const parts = await this.storage.get('parts');
    return parts;
  }
}
