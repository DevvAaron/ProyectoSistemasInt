import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'seleccion',
    loadChildren: () => import('./seleccion/seleccion.module').then( m => m.SeleccionPageModule)
  },
  {
    path: 'login-administrador',
    loadChildren: () => import('./login-administrador/login-administrador.module').then( m => m.LoginAdministradorPageModule)
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
  },
  {
    path: 'lista-clips',
    loadChildren: () => import('./lista-clips/lista-clips.module').then( m => m.ListaClipsPageModule)
  },
  {
    path: 'panel-control',
    loadChildren: () => import('./panel-control/panel-control.module').then( m => m.PanelControlPageModule)
  },
  {
    path: 'visua-clip',
    loadChildren: () => import('./visua-clip/visua-clip.module').then( m => m.VisuaClipPageModule)
  },
  {
  path: 'seleccion-estadisticas',
  loadChildren: () => import('./seleccion-estadisticas/seleccion-estadisticas.module').then( m => m.SeleccionEstadisticasPageModule)
},
{
  path: 'lab-incidentes',
  loadChildren: () => import('./lab-incidentes/lab-incidentes.module').then( m => m.LabIncidentesPageModule)
},
{
  path: 'prof-incidentes',
  loadChildren: () => import('./prof-incidentes/prof-incidentes.module').then( m => m.ProfIncidentesPageModule)
},
{
  path: 'curso-incidentes',
  loadChildren: () => import('./curso-incidentes/curso-incidentes.module').then( m => m.CursoIncidentesPageModule)
},
{
  path: 'turn-incidentes',
  loadChildren: () => import('./turn-incidentes/turn-incidentes.module').then( m => m.TurnIncidentesPageModule)
},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
