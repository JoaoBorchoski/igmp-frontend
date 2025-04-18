import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AlizarListComponent } from 'src/app/pages/configuracao/alizar/alizar-list/alizar-list.component'
import { AlizarEditComponent } from 'src/app/pages/configuracao/alizar/alizar-edit/alizar-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesAlizar = [
  {
    path: "",
    component: AlizarListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: AlizarEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: AlizarEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: AlizarEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: AlizarEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesAlizar)]
  ],
  exports: [RouterModule]
})

export class AlizarModule { }
