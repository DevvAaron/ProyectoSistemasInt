import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurnIncidentesPage } from './turn-incidentes.page';

describe('TurnIncidentesPage', () => {
  let component: TurnIncidentesPage;
  let fixture: ComponentFixture<TurnIncidentesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnIncidentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
