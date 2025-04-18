import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PacoteListComponent } from 'src/app/pages/operacao/pacote/pacote-list/pacote-list.component'
import { PacoteEditComponent } from 'src/app/pages/operacao/pacote/pacote-edit/pacote-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesPacote = [
  {
    path: "",
    component: PacoteListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: PacoteEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: PacoteEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: PacoteEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: PacoteEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesPacote)]
  ],
  exports: [RouterModule]
})

export class PacoteModule { }
