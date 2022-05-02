import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { AppBarComponent } from './app-bar.component';

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

describe('AppBarComponent', () => {
  let component: AppBarComponent;
  let fixture: ComponentFixture<AppBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBarComponent ],
      imports: [
        TranslateTestingModule
          .withTranslations('en', english)
          .withTranslations('fr', french)
          .withDefaultLanguage('en'),
          MatMenuModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
