import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PadraoCorListComponent } from 'src/app/pages/configuracao/padrao-cor/padrao-cor-list/padrao-cor-list.component'
import { PadraoCorEditComponent } from 'src/app/pages/configuracao/padrao-cor/padrao-cor-edit/padrao-cor-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesPadraoCor = [
  {
    path: "",
    component: PadraoCorListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: PadraoCorEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: PadraoCorEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: PadraoCorEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: PadraoCorEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesPadraoCor)]
  ],
  exports: [RouterModule]
})

export class PadraoCorModule { }
