import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisuaClipPage } from './visua-clip.page';

describe('VisuaClipPage', () => {
  let component: VisuaClipPage;
  let fixture: ComponentFixture<VisuaClipPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisuaClipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
