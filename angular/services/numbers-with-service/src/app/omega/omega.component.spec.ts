import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmegaComponent } from './omega.component';

describe('OmegaComponent', () => {
  let component: OmegaComponent;
  let fixture: ComponentFixture<OmegaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmegaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
