import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FechaduraListComponent } from 'src/app/pages/configuracao/fechadura/fechadura-list/fechadura-list.component'
import { FechaduraEditComponent } from 'src/app/pages/configuracao/fechadura/fechadura-edit/fechadura-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesFechadura = [
  {
    path: "",
    component: FechaduraListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: FechaduraEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: FechaduraEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: FechaduraEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: FechaduraEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesFechadura)]
  ],
  exports: [RouterModule]
})

export class FechaduraModule { }
