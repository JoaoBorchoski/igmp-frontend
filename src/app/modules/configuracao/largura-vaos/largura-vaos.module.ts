import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LarguraVaosListComponent } from 'src/app/pages/configuracao/largura-vaos/largura-vaos-list/largura-vaos-list.component'
import { LarguraVaosEditComponent } from 'src/app/pages/configuracao/largura-vaos/largura-vaos-edit/largura-vaos-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesLarguraVaos = [
  {
    path: "",
    component: LarguraVaosListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: LarguraVaosEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: LarguraVaosEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: LarguraVaosEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: LarguraVaosEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesLarguraVaos)]
  ],
  exports: [RouterModule]
})

export class LarguraVaosModule { }
