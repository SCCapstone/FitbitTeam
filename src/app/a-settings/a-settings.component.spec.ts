import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ASettingsComponent } from './a-settings.component';

describe('ASettingsComponent', () => {
  let component: ASettingsComponent;
  let fixture: ComponentFixture<ASettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ASettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ASettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
