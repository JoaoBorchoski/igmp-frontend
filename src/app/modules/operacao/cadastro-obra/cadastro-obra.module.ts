import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CadastroObraListComponent } from 'src/app/pages/operacao/cadastro-obra/cadastro-obra-list/cadastro-obra-list.component'
import { CadastroObraEditComponent } from 'src/app/pages/operacao/cadastro-obra/cadastro-obra-edit/cadastro-obra-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesCadastroObra = [
  {
    path: "",
    component: CadastroObraListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: CadastroObraEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: CadastroObraEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: CadastroObraEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: CadastroObraEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesCadastroObra)]
  ],
  exports: [RouterModule]
})

export class CadastroObraModule { }
