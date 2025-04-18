import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NegociacaoListComponent } from 'src/app/pages/operacao/negociacao/negociacao-list/negociacao-list.component'
import { NegociacaoEditComponent } from 'src/app/pages/operacao/negociacao/negociacao-edit/negociacao-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesNegociacao = [
  {
    path: "",
    component: NegociacaoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: NegociacaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: NegociacaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: NegociacaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: NegociacaoEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesNegociacao)]
  ],
  exports: [RouterModule]
})

export class NegociacaoModule { }
