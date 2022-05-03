import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
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
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  it('should have been initialized with french language', () => {
    expect(component.currLang).toBe('fr');
  });

  it('should change language correctly', () => {
    component.changeLanguage('en');
    expect(component.currLang).toBe('en');
  });

  it('should have 1 element', () => {
    const toolbar: HTMLElement = fixture.nativeElement;
    expect(toolbar.children.length).toBe(1);
  });

  it('should have 4 children elements', () => {
    const toolbar: HTMLElement = fixture.nativeElement;
    expect(toolbar.children[0].children.length).toBe(4);
  });

  it('should have 4 specific children', () => {
    const toolbar: HTMLElement = fixture.nativeElement;
    const tags = [];
    for(let i = 0; i < toolbar.children[0].children.length; i++) {
        tags.push(toolbar.children[0].children.item(i)?.tagName);
    }
    expect(tags).toEqual(['SPAN', 'DIV', 'BUTTON', 'MAT-MENU']);
  });

  it('should have a span with League of Legends text in it', () => {
    const toolbar: HTMLElement = fixture.nativeElement;
    expect(toolbar.children[0].children[0].innerHTML).toBe('League of Legends');
  });

  it('should have a span with `League of Legends` text in it which does not change with translation', () => {
    const toolbar: HTMLElement = fixture.nativeElement;
    component.changeLanguage('en');
    expect(toolbar.children[0].children[0].innerHTML).toBe('League of Legends');
  });
});
