import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TipoPortaListComponent } from 'src/app/pages/configuracao/tipo-porta/tipo-porta-list/tipo-porta-list.component'
import { TipoPortaEditComponent } from 'src/app/pages/configuracao/tipo-porta/tipo-porta-edit/tipo-porta-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesTipoPorta = [
  {
    path: "",
    component: TipoPortaListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: TipoPortaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: TipoPortaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: TipoPortaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: TipoPortaEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesTipoPorta)]
  ],
  exports: [RouterModule]
})

export class TipoPortaModule { }
