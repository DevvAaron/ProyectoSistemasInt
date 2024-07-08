import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursoIncidentesPage } from './curso-incidentes.page';

describe('CursoIncidentesPage', () => {
  let component: CursoIncidentesPage;
  let fixture: ComponentFixture<CursoIncidentesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoIncidentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
