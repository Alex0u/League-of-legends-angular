import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { DataService } from 'src/app/services/data.service';
import { ChampionsDataGridComponent } from './champions-data-grid.component';
import english from '../../../assets/i18n/en.json';
import french from '../../../assets/i18n/fr.json';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

describe('ChampionsDataGridComponent', () => {
  let component: ChampionsDataGridComponent;
  let fixture: ComponentFixture<ChampionsDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionsDataGridComponent ],
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(DataService, { dataEncapsulation: false, passThruUnknownUrl: true }),
        TranslateTestingModule
        .withTranslations('en', english)
        .withTranslations('fr', french)
        .withDefaultLanguage('en'),
        MatSnackBarModule,
        MatDialogModule,
        MatMenuModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionsDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an array composed of 138 elements', waitForAsync(() => {
    component.champions$.subscribe(res => {
      expect(res.length).toBe(138);
    });
  }));
});
