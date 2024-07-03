import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaClipsPage } from './lista-clips.page';

describe('ListaClipsPage', () => {
  let component: ListaClipsPage;
  let fixture: ComponentFixture<ListaClipsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaClipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
