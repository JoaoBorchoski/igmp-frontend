import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MedicaoListComponent } from 'src/app/pages/operacao/medicao/medicao-list/medicao-list.component'
import { MedicaoEditComponent } from 'src/app/pages/operacao/medicao/medicao-edit/medicao-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesMedicao = [
  {
    path: "",
    component: MedicaoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: MedicaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: MedicaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: MedicaoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: MedicaoEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesMedicao)]
  ],
  exports: [RouterModule]
})

export class MedicaoModule { }
