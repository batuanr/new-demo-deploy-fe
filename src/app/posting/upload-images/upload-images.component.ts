import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
  selectedFile: File;
  ref: AngularFireStorageReference;
  downloadUrl: string;
  checkUpLoadFile = false;
  @Output()
  giveUrlToCreate = new EventEmitter<string[]>();
  images: Array<string> = [];
  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }
  onFileChange($event) {
    this.selectedFile = $event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    this.checkUpLoadFile = true;
    const  id = Math.random().toString(36).substring(2); // tạo ra 1 cái ten random trên firebase
    this.ref = this.afStorage.ref(id);
    // this.ref.put(this.selectedFile)
    this.ref.put(this.selectedFile).then(snapshot => { // trả về 1 chuỗi siêu văn bản
        return snapshot.ref.getDownloadURL();
      }).then(downloadURL => {
        this.checkUpLoadFile = false;
        this.downloadUrl = downloadURL;
        this.images.push(downloadURL);
        this.giveUrlToCreate.emit(this.images);
      })
        .catch(error => {
          console.log(`Failed to upload avatar! ${error}`);
        });
    }

  deleteImg(i: number) {
    this.images.splice(i, 1);
  }
}
