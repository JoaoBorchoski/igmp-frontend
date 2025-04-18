import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { DefaultComponent } from "./_layouts/default/default.component"
import { HomeComponent } from "./pages/authentication/home/home.component"
import { ProfileComponent } from './pages/authentication/profile/profile.component'
import { LoginComponent } from "./pages/authentication/login/login.component"
import { ResetPasswordComponent } from "./pages/authentication/reset-password/reset-password.component"
import { NotAuthorizedComponent } from "./pages/security/not-authorized/not-authorized.component"
import { AuthGuard } from "./services/auth.guard"

// Componentes
const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'block-reasons',
        loadChildren: () => import('./modules/security/block-reasons/block-reasons.module').then(m => m.BlockReasonsModule),
      },
      {
        path: 'user-groups',
        loadChildren: () => import('./modules/security/user-groups/user-groups.module').then(m => m.UserGroupsModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./modules/security/users/users.module').then(m => m.UsersModule),
      },
      {
        path: 'modules',
        loadChildren: () => import('./modules/security/modules/modules.module').then(m => m.ModulesModule),
      },
      {
        path: 'menu-options',
        loadChildren: () => import('./modules/security/menu-options/menu-options.module').then(m => m.MenuOptionsModule),
      },
      {
        path: 'profiles',
        loadChildren: () => import('./modules/security/profiles/profiles.module').then(m => m.ProfilesModule),
      },
      {
        path: 'profile-options',
        loadChildren: () => import('./modules/security/profile-options/profile-options.module').then(m => m.ProfileOptionsModule),
      },
      {
        path: 'users-profiles',
        loadChildren: () => import('./modules/security/users-profile/users-profile.module').then(m => m.UsersProfileModule),
      },
      {
        path: 'navigations',
        loadChildren: () => import('./modules/security/navigations/navigations.module').then(m => m.NavigationsModule),
      },
      {
        path: 'paises',
        loadChildren: () => import('./modules/comum/pais/pais.module').then(m => m.PaisModule),
      },
      {
        path: 'estados',
        loadChildren: () => import('./modules/comum/estado/estado.module').then(m => m.EstadoModule),
      },
      {
        path: 'cidades',
        loadChildren: () => import('./modules/comum/cidade/cidade.module').then(m => m.CidadeModule),
      },
      {
        path: 'ceps',
        loadChildren: () => import('./modules/comum/cep/cep.module').then(m => m.CepModule),
      },
      {
        path: 'funcionarios',
        loadChildren: () => import('./modules/configuracao/funcionario/funcionario.module').then(m => m.FuncionarioModule),
      },
      {
        path: 'clientes',
        loadChildren: () => import('./modules/configuracao/cliente/cliente.module').then(m => m.ClienteModule),
      },
      {
        path: 'padroes-cores',
        loadChildren: () => import('./modules/configuracao/padrao-cor/padrao-cor.module').then(m => m.PadraoCorModule),
      },
      {
        path: 'tipos-enchimento',
        loadChildren: () => import('./modules/configuracao/tipo-enchimento/tipo-enchimento.module').then(m => m.TipoEnchimentoModule),
      },
      {
        path: 'sentidos-abertura',
        loadChildren: () => import('./modules/configuracao/sentido-abertura/sentido-abertura.module').then(m => m.SentidoAberturaModule),
      },
      {
        path: 'tipos-porta',
        loadChildren: () => import('./modules/configuracao/tipo-porta/tipo-porta.module').then(m => m.TipoPortaModule),
      },
      {
        path: 'fechaduras',
        loadChildren: () => import('./modules/configuracao/fechadura/fechadura.module').then(m => m.FechaduraModule),
      },
      {
        path: 'alizares',
        loadChildren: () => import('./modules/configuracao/alizar/alizar.module').then(m => m.AlizarModule),
      },
      {
        path: 'larguras-vaos',
        loadChildren: () => import('./modules/configuracao/largura-vaos/largura-vaos.module').then(m => m.LarguraVaosModule),
      },
      {
        path: 'alturas-vaos',
        loadChildren: () => import('./modules/configuracao/altura-vaos/altura-vaos.module').then(m => m.AlturaVaosModule),
      },
      {
        path: 'status-negociacoes',
        loadChildren: () => import('./modules/configuracao/status-negociacao/status-negociacao.module').then(m => m.StatusNegociacaoModule),
      },
      {
        path: 'pedidos',
        loadChildren: () => import('./modules/operacao/pedido/pedido.module').then(m => m.PedidoModule),
      },
      {
        path: 'pedidos-items',
        loadChildren: () => import('./modules/operacao/pedido-item/pedido-item.module').then(m => m.PedidoItemModule),
      },
      {
        path: 'pacotes',
        loadChildren: () => import('./modules/operacao/pacote/pacote.module').then(m => m.PacoteModule),
      },
      {
        path: 'pacotes-items',
        loadChildren: () => import('./modules/operacao/pacote-item/pacote-item.module').then(m => m.PacoteItemModule),
      },
      {
        path: 'cadastro-obras',
        loadChildren: () => import('./modules/operacao/cadastro-obra/cadastro-obra.module').then(m => m.CadastroObraModule),
      },
      {
        path: 'medicoes',
        loadChildren: () => import('./modules/operacao/medicao/medicao.module').then(m => m.MedicaoModule),
      },
      {
        path: 'negociacoes',
        loadChildren: () => import('./modules/operacao/negociacao/negociacao.module').then(m => m.NegociacaoModule),
      },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "reset/:id",
    component: ResetPasswordComponent,
  },
  {
    path: "not-authorized",
    component: NotAuthorizedComponent
  },

  { path: "**", redirectTo: "/login" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
