import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqtopicComponent } from './reqtopic.component';

describe('ReqtopicComponent', () => {
  let component: ReqtopicComponent;
  let fixture: ComponentFixture<ReqtopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqtopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqtopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
