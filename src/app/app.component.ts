import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FileUploadService } from './services/file-upload.service';
import { AESEncryptionService } from './services/aes-encryption.service';

import { Student } from './student.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  image: File;
  previewImage: string;
  qrData: string;

  constructor(
    private fileUploadService: FileUploadService,
    private AESEncryptionService: AESEncryptionService
  ) {
    this.previewImage = '/assets/img/nsvs1.jpg';
  }

  onFileUpload(event): void {
    const [file] = event.target.files;

    const reader = new FileReader();
    reader.onload = () => (this.previewImage = reader.result as string);
    reader.readAsDataURL(file);

    this.image = file;
  }

  async onSubmit(form: NgForm) {
    const imageUrl = await this.fileUploadService.uploadFile(this.image);

    const student: Student = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      indexNumber: form.value.indexNumber,
      imageUrl,
    };

    const studentData = JSON.stringify(student);

    this.qrData = this.AESEncryptionService.encrypt(studentData);

    form.resetForm();

    console.log(this.qrData);
  }
}
