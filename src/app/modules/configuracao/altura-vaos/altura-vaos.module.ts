import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AlturaVaosListComponent } from 'src/app/pages/configuracao/altura-vaos/altura-vaos-list/altura-vaos-list.component'
import { AlturaVaosEditComponent } from 'src/app/pages/configuracao/altura-vaos/altura-vaos-edit/altura-vaos-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesAlturaVaos = [
  {
    path: "",
    component: AlturaVaosListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: AlturaVaosEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: AlturaVaosEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: AlturaVaosEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: AlturaVaosEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesAlturaVaos)]
  ],
  exports: [RouterModule]
})

export class AlturaVaosModule { }
