import { FilesService } from './../services/file-service';
import { IFile } from './../models/file.model';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilesResolver implements Resolve<IFile[] | null> {
  constructor(private filesService: FilesService) { }

  resolve(): Observable<IFile[]> {
    return this.filesService.getUserFiles();
  }
}
