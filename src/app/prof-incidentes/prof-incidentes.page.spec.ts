import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfIncidentesPage } from './prof-incidentes.page';

describe('PorfIncidentesPage', () => {
  let component: ProfIncidentesPage;
  let fixture: ComponentFixture<ProfIncidentesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfIncidentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
