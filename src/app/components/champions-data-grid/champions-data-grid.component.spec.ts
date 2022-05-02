import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionsDataGridComponent } from './champions-data-grid.component';

describe('ChampionsDataGridComponent', () => {
  let component: ChampionsDataGridComponent;
  let fixture: ComponentFixture<ChampionsDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionsDataGridComponent ]
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
