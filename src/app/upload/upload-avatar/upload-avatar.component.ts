import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit {
  selectedFile: File;
  ref: AngularFireStorageReference;
  downloadUrl: string;
  checkUpLoadFile = false;
  @Output()
  giveUrlToCreate = new EventEmitter<string>();
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
    this.ref.put(this.selectedFile).then(snapshot => { // trả về 1 chuỗi siêu văn bản
      return snapshot.ref.getDownloadURL();
    }).then(downloadURL => {
      this.checkUpLoadFile = false;
      this.downloadUrl = downloadURL;
      this.giveUrlToCreate.emit(this.downloadUrl);
      return downloadURL;
    })
      .catch(error => {
        console.log(`Failed to upload avatar! ${error}`);
      });
  }

}
