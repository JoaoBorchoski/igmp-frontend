import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PacoteItemListComponent } from 'src/app/pages/operacao/pacote-item/pacote-item-list/pacote-item-list.component'
import { PacoteItemEditComponent } from 'src/app/pages/operacao/pacote-item/pacote-item-edit/pacote-item-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesPacoteItem = [
  {
    path: "",
    component: PacoteItemListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: PacoteItemEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: PacoteItemEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: PacoteItemEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: PacoteItemEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesPacoteItem)]
  ],
  exports: [RouterModule]
})

export class PacoteItemModule { }
