import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsCellRendererComponent } from './buttons-cell-renderer.component';

describe('ButtonsCellRendererComponent', () => {
  let component: ButtonsCellRendererComponent;
  let fixture: ComponentFixture<ButtonsCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonsCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
