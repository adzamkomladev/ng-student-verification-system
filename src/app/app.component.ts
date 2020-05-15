import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FileUploadService } from './file-upload.service';

import { Student } from './student.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  image: File;
  previewImage: string;

  constructor(private fileUploadService: FileUploadService) {
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

    console.log({ student });
  }
}
