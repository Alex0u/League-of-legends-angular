import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { EditDialogComponent } from './edit-dialog.component';
import english from '../../../assets/i18n/en.json';
import french from '../../../assets/i18n/fr.json';

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDialogComponent ],
      imports: [
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateTestingModule
          .withTranslations('en', english)
          .withTranslations('fr', french)
          .withDefaultLanguage('en'),
      ],
      providers: [ 
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
