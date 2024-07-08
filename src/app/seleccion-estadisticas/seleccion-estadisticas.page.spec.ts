import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionEstadisticasPage } from './seleccion-estadisticas.page';

describe('SeleccionEstadisticasPage', () => {
  let component: SeleccionEstadisticasPage;
  let fixture: ComponentFixture<SeleccionEstadisticasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionEstadisticasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
