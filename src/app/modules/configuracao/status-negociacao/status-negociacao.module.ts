import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { StatusNegociacaoListComponent } from 'src/app/pages/configuracao/status-negociacao/status-negociacao-list/status-negociacao-list.component'
import { StatusNegociacaoEditComponent } from 'src/app/pages/configuracao/status-negociacao/status-negociacao-edit/status-negociacao-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesStatusNegociacao = [
  {
    path: "",
    component: StatusNegociacaoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: StatusNegociacaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: StatusNegociacaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: StatusNegociacaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: StatusNegociacaoEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesStatusNegociacao)]
  ],
  exports: [RouterModule]
})

export class StatusNegociacaoModule { }
