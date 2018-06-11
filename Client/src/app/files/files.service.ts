import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { File } from './files.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FilesService {
  private files: File[] = [];
  private filesUpdated = new Subject<File[]>();

  constructor(public http: HttpClient) {}

  getFiles() {
    this.http.get<File[]>('http://localhost:3000/api/files')
    .subscribe(files => {
      this.files = files;
      this.filesUpdated.next(files);
    });
  }

  getFilesUpdateLister() {
    return this.filesUpdated.asObservable();
  }
}
