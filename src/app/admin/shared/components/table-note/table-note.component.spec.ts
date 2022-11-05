import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNoteComponent } from './table-note.component';

describe('TableNoteComponent', () => {
  let component: TableNoteComponent;
  let fixture: ComponentFixture<TableNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
