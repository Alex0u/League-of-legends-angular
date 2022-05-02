import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { ChampionsDataGridComponent } from './champions-data-grid.component';

const english = {
  "APPBAR": {
    "TITLE": "League of Legends",
    "FRENCH": "French",
    "ENGLISH": "English"
  },
};

const french = {
  "APPBAR": {
    "TITLE": "League of Legends",
    "FRENCH": "Français",
    "ENGLISH": "Anglais"
  },
};

describe('ChampionsDataGridComponent', () => {
  let component: ChampionsDataGridComponent;
  let fixture: ComponentFixture<ChampionsDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionsDataGridComponent ],
      imports: [
        HttpClientModule,
        TranslateTestingModule
        .withTranslations('en', english)
        .withTranslations('fr', french)
        .withDefaultLanguage('en'),
        MatSnackBarModule
      ]
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
});
