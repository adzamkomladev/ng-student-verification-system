import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  image: File;
  previewImage: string;

  constructor() {
    this.previewImage = '/assets/img/nsvs1.jpg';
  }

  onFileUpload(event): void {
    const [file] = event.target.files;

    const reader = new FileReader();
    reader.onload = () => (this.previewImage = reader.result as string);
    reader.readAsDataURL(file);

    this.image = file;
  }

  onSubmit(form: NgForm): void {}
}
