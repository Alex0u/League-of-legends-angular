import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { DeletionDialogComponent } from './deletion-dialog.component';
import english from '../../../assets/i18n/en.json';
import french from '../../../assets/i18n/fr.json';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DeletionDialogComponent', () => {
  let component: DeletionDialogComponent;
  let fixture: ComponentFixture<DeletionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletionDialogComponent ],
      imports: [
        MatDialogModule,
        TranslateTestingModule
        .withTranslations('en', english)
        .withTranslations('fr', french)
        .withDefaultLanguage('en'),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
