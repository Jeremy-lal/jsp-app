import { INote } from '../../../core/models/note.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-note',
  templateUrl: './table-note.component.html',
  styleUrls: ['./table-note.component.scss']
})
export class TableNoteComponent {
  @Input() notes: INote[] = []
  displayedColumns = ['position', 'title', 'value']

  get average() {
    let sum = this.notes.map(t => +t.valeur).reduce((acc, value) => acc + value, 0);
    return Math.round(sum / this.notes!.length * 100) / 100;
  }
}
