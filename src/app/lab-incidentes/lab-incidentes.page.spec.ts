import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabIncidentesPage } from './lab-incidentes.page';

describe('LabIncidentesPage', () => {
  let component: LabIncidentesPage;
  let fixture: ComponentFixture<LabIncidentesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LabIncidentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
