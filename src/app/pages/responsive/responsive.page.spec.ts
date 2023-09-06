import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsivePage } from './responsive.page';

describe('ResponsivePage', () => {
  let component: ResponsivePage;
  let fixture: ComponentFixture<ResponsivePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResponsivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
