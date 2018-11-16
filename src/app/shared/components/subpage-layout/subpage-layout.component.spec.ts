import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageLayoutComponent } from './subpage-layout.component';

describe('SubpageComponent', () => {
  let component: SubpageLayoutComponent;
  let fixture: ComponentFixture<SubpageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubpageLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubpageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
