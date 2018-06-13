import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { File } from '../files.model';
import { FilesService } from '../files.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-files-browser',
  templateUrl: './files-browser.component.html',
  styleUrls: ['./files-browser.component.css']
})
export class FilesBrowserComponent implements OnInit, OnDestroy {
  files: File[] = [];
  private filesSub: Subscription;
  objectKeys = (o) => Object.keys(o);
  constructor(public filesService: FilesService) {}

  ngOnInit() {
    this.filesService.getFiles();
    this.filesSub = this.filesService.getFilesUpdateLister()
      .subscribe((files: File[]) => {
        this.files = files;
      });
  }

  ngOnDestroy(): void {
    this.filesSub.unsubscribe();
  }
}
