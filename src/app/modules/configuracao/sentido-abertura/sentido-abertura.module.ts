import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SentidoAberturaListComponent } from 'src/app/pages/configuracao/sentido-abertura/sentido-abertura-list/sentido-abertura-list.component'
import { SentidoAberturaEditComponent } from 'src/app/pages/configuracao/sentido-abertura/sentido-abertura-edit/sentido-abertura-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesSentidoAbertura = [
  {
    path: "",
    component: SentidoAberturaListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: SentidoAberturaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: SentidoAberturaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: SentidoAberturaEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: SentidoAberturaEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesSentidoAbertura)]
  ],
  exports: [RouterModule]
})

export class SentidoAberturaModule { }
