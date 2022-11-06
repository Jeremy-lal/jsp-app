import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IFile } from 'src/app/core/models/file.model';
import { FilesService } from 'src/app/core/services/file-service';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent {
  selectedFile!: File;
  groupeSelected = 'Jsp1'

  constructor(private filesService: FilesService, public dialogRef: MatDialogRef<FileFormComponent>) { }


  selectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
    }
  }

  onSubmit() {
    const file: IFile = {
      name: this.selectedFile.name,
      grp: this.groupeSelected
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.filesService.saveFile(formData).subscribe(
      () => {
        this.filesService.saveFileBdd(file).subscribe(() => {
          this.dialogRef.close()
        })
      },
      (err) => {
        alert('Erreur lors de la sauvegarde de ce fichier')
      })
  }
}
