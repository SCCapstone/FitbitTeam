import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CSettingsComponent } from './c-settings.component';

describe('CSettingsComponent', () => {
  let component: CSettingsComponent;
  let fixture: ComponentFixture<CSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
