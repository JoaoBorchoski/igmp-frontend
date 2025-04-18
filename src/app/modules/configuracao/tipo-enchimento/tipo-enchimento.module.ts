import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TipoEnchimentoListComponent } from 'src/app/pages/configuracao/tipo-enchimento/tipo-enchimento-list/tipo-enchimento-list.component'
import { TipoEnchimentoEditComponent } from 'src/app/pages/configuracao/tipo-enchimento/tipo-enchimento-edit/tipo-enchimento-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesTipoEnchimento = [
  {
    path: "",
    component: TipoEnchimentoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: TipoEnchimentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: TipoEnchimentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: TipoEnchimentoEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: TipoEnchimentoEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesTipoEnchimento)]
  ],
  exports: [RouterModule]
})

export class TipoEnchimentoModule { }
