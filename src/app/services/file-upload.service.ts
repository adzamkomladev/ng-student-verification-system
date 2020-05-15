import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private afStorage: AngularFireStorage) {}

  async uploadFile(file: File): Promise<string> {
    const path = `images/${Date.now()}.${file.name.split('.').pop()}`;

    try {
      // The main task
      const uploadTaskSnapshot = await this.afStorage.upload(path, file);

      return await uploadTaskSnapshot.ref.getDownloadURL();
    } catch (error) {
      console.error({ error });
    }
  }
}
