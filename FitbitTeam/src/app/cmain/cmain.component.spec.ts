import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmainComponent } from './cmain.component';

describe('CmainComponent', () => {
  let component: CmainComponent;
  let fixture: ComponentFixture<CmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
