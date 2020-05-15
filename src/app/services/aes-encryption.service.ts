import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AESEncryptionService {
  private readonly secretKey: string;

  constructor() {
    this.secretKey = 'dankwasmithkelvi';
  }

  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }
}
