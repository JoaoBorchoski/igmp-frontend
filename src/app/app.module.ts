import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { RouterModule } from "@angular/router"
import { PoPageModule, PoI18nModule } from "@po-ui/ng-components"
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { DefaultComponent } from "./_layouts/default/default.component"
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { NoDataComponent } from './components/no-data/no-data.component'
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';
import { SavedFilterComponent } from './components/filter-modal/saved-filter/saved-filter.component'
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { HomeComponent } from "./pages/authentication/home/home.component"
import { ProfileComponent } from './pages/authentication/profile/profile.component'
import { LoginComponent } from "./pages/authentication/login/login.component"
import { ResetPasswordComponent } from "./pages/authentication/reset-password/reset-password.component"
import { BlockReasonEditComponent } from "./pages/security/block-reason/block-reason-edit/block-reason-edit.component"
import { BlockReasonListComponent } from "./pages/security/block-reason/block-reason-list/block-reason-list.component"
import { UserGroupEditComponent } from "./pages/security/user-group/user-group-edit/user-group-edit.component"
import { UserGroupListComponent } from "./pages/security/user-group/user-group-list/user-group-list.component"
import { UserEditComponent } from "./pages/security/user/user-edit/user-edit.component"
import { UserListComponent } from "./pages/security/user/user-list/user-list.component"
import { ModuleEditComponent } from "./pages/security/module/module-edit/module-edit.component"
import { ModuleListComponent } from "./pages/security/module/module-list/module-list.component"
import { MenuOptionEditComponent } from "./pages/security/menu-option/menu-option-edit/menu-option-edit.component"
import { MenuOptionListComponent } from "./pages/security/menu-option/menu-option-list/menu-option-list.component"
import { ProfileEditComponent } from "./pages/security/profile/profile-edit/profile-edit.component"
import { ProfileListComponent } from "./pages/security/profile/profile-list/profile-list.component"
import { ProfileOptionEditComponent } from "./pages/security/profile-option/profile-option-edit/profile-option-edit.component"
import { ProfileOptionListComponent } from "./pages/security/profile-option/profile-option-list/profile-option-list.component"
import { UserProfileEditComponent } from "./pages/security/user-profile/user-profile-edit/user-profile-edit.component"
import { UserProfileListComponent } from "./pages/security/user-profile/user-profile-list/user-profile-list.component"
import { NavigationEditComponent } from "./pages/security/navigation/navigation-edit/navigation-edit.component"
import { NavigationListComponent } from "./pages/security/navigation/navigation-list/navigation-list.component"
import { PaisEditComponent } from "./pages/comum/pais/pais-edit/pais-edit.component"
import { PaisListComponent } from "./pages/comum/pais/pais-list/pais-list.component"
import { EstadoEditComponent } from "./pages/comum/estado/estado-edit/estado-edit.component"
import { EstadoListComponent } from "./pages/comum/estado/estado-list/estado-list.component"
import { CidadeEditComponent } from "./pages/comum/cidade/cidade-edit/cidade-edit.component"
import { CidadeListComponent } from "./pages/comum/cidade/cidade-list/cidade-list.component"
import { CepEditComponent } from "./pages/comum/cep/cep-edit/cep-edit.component"
import { CepListComponent } from "./pages/comum/cep/cep-list/cep-list.component"
import { FuncionarioEditComponent } from "./pages/configuracao/funcionario/funcionario-edit/funcionario-edit.component"
import { FuncionarioListComponent } from "./pages/configuracao/funcionario/funcionario-list/funcionario-list.component"
import { ClienteEditComponent } from "./pages/configuracao/cliente/cliente-edit/cliente-edit.component"
import { ClienteListComponent } from "./pages/configuracao/cliente/cliente-list/cliente-list.component"
import { PadraoCorEditComponent } from "./pages/configuracao/padrao-cor/padrao-cor-edit/padrao-cor-edit.component"
import { PadraoCorListComponent } from "./pages/configuracao/padrao-cor/padrao-cor-list/padrao-cor-list.component"
import { TipoEnchimentoEditComponent } from "./pages/configuracao/tipo-enchimento/tipo-enchimento-edit/tipo-enchimento-edit.component"
import { TipoEnchimentoListComponent } from "./pages/configuracao/tipo-enchimento/tipo-enchimento-list/tipo-enchimento-list.component"
import { SentidoAberturaEditComponent } from "./pages/configuracao/sentido-abertura/sentido-abertura-edit/sentido-abertura-edit.component"
import { SentidoAberturaListComponent } from "./pages/configuracao/sentido-abertura/sentido-abertura-list/sentido-abertura-list.component"
import { TipoPortaEditComponent } from "./pages/configuracao/tipo-porta/tipo-porta-edit/tipo-porta-edit.component"
import { TipoPortaListComponent } from "./pages/configuracao/tipo-porta/tipo-porta-list/tipo-porta-list.component"
import { FechaduraEditComponent } from "./pages/configuracao/fechadura/fechadura-edit/fechadura-edit.component"
import { FechaduraListComponent } from "./pages/configuracao/fechadura/fechadura-list/fechadura-list.component"
import { AlizarEditComponent } from "./pages/configuracao/alizar/alizar-edit/alizar-edit.component"
import { AlizarListComponent } from "./pages/configuracao/alizar/alizar-list/alizar-list.component"
import { LarguraVaosEditComponent } from "./pages/configuracao/largura-vaos/largura-vaos-edit/largura-vaos-edit.component"
import { LarguraVaosListComponent } from "./pages/configuracao/largura-vaos/largura-vaos-list/largura-vaos-list.component"
import { AlturaVaosEditComponent } from "./pages/configuracao/altura-vaos/altura-vaos-edit/altura-vaos-edit.component"
import { AlturaVaosListComponent } from "./pages/configuracao/altura-vaos/altura-vaos-list/altura-vaos-list.component"
import { StatusNegociacaoEditComponent } from "./pages/configuracao/status-negociacao/status-negociacao-edit/status-negociacao-edit.component"
import { StatusNegociacaoListComponent } from "./pages/configuracao/status-negociacao/status-negociacao-list/status-negociacao-list.component"
import { PedidoEditComponent } from "./pages/operacao/pedido/pedido-edit/pedido-edit.component"
import { PedidoListComponent } from "./pages/operacao/pedido/pedido-list/pedido-list.component"
import { PedidoItemEditComponent } from "./pages/operacao/pedido-item/pedido-item-edit/pedido-item-edit.component"
import { PedidoItemListComponent } from "./pages/operacao/pedido-item/pedido-item-list/pedido-item-list.component"
import { PacoteEditComponent } from "./pages/operacao/pacote/pacote-edit/pacote-edit.component"
import { PacoteListComponent } from "./pages/operacao/pacote/pacote-list/pacote-list.component"
import { PacoteItemEditComponent } from "./pages/operacao/pacote-item/pacote-item-edit/pacote-item-edit.component"
import { PacoteItemListComponent } from "./pages/operacao/pacote-item/pacote-item-list/pacote-item-list.component"
import { CadastroObraEditComponent } from "./pages/operacao/cadastro-obra/cadastro-obra-edit/cadastro-obra-edit.component"
import { CadastroObraListComponent } from "./pages/operacao/cadastro-obra/cadastro-obra-list/cadastro-obra-list.component"
import { MedicaoEditComponent } from "./pages/operacao/medicao/medicao-edit/medicao-edit.component"
import { MedicaoListComponent } from "./pages/operacao/medicao/medicao-list/medicao-list.component"
import { NegociacaoEditComponent } from "./pages/operacao/negociacao/negociacao-edit/negociacao-edit.component"
import { NegociacaoListComponent } from "./pages/operacao/negociacao/negociacao-list/negociacao-list.component"
import { TokenInterceptorService } from "./services/token-interceptor.service"
import { ErrorInterceptorService } from "./services/error-interceptor.service"
import { NotAuthorizedComponent } from './pages/security/not-authorized/not-authorized.component'

import { SharedModule } from "./shared/shared.module"
import { i18nConfig } from './shared/i18n'

// PO-UI
@NgModule({
  declarations: [
    AppComponent,
    CustomTableComponent,
    NoDataComponent,
    FilterModalComponent,
    SavedFilterComponent,
    LoginComponent,
    ResetPasswordComponent,
    BlockReasonEditComponent,
    BlockReasonListComponent,
    UserGroupEditComponent,
    UserGroupListComponent,
    UserEditComponent,
    UserListComponent,
    ModuleEditComponent,
    ModuleListComponent,
    MenuOptionEditComponent,
    MenuOptionListComponent,
    ProfileEditComponent,
    ProfileListComponent,
    ProfileOptionEditComponent,
    ProfileOptionListComponent,
    UserProfileEditComponent,
    UserProfileListComponent,
    NavigationEditComponent,
    NavigationListComponent,
    PaisEditComponent,
    PaisListComponent,
    EstadoEditComponent,
    EstadoListComponent,
    CidadeEditComponent,
    CidadeListComponent,
    CepEditComponent,
    CepListComponent,
    FuncionarioEditComponent,
    FuncionarioListComponent,
    ClienteEditComponent,
    ClienteListComponent,
    PadraoCorEditComponent,
    PadraoCorListComponent,
    TipoEnchimentoEditComponent,
    TipoEnchimentoListComponent,
    SentidoAberturaEditComponent,
    SentidoAberturaListComponent,
    TipoPortaEditComponent,
    TipoPortaListComponent,
    FechaduraEditComponent,
    FechaduraListComponent,
    AlizarEditComponent,
    AlizarListComponent,
    LarguraVaosEditComponent,
    LarguraVaosListComponent,
    AlturaVaosEditComponent,
    AlturaVaosListComponent,
    StatusNegociacaoEditComponent,
    StatusNegociacaoListComponent,
    PedidoEditComponent,
    PedidoListComponent,
    PedidoItemEditComponent,
    PedidoItemListComponent,
    PacoteEditComponent,
    PacoteListComponent,
    PacoteItemEditComponent,
    PacoteItemListComponent,
    CadastroObraEditComponent,
    CadastroObraListComponent,
    MedicaoEditComponent,
    MedicaoListComponent,
    NegociacaoEditComponent,
    NegociacaoListComponent,
    DefaultComponent,
    HomeComponent,
    ProfileComponent,
    NotAuthorizedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    RouterModule.forRoot([]),
    PoPageModule,
    FormsModule,
    ReactiveFormsModule,
    PoI18nModule.config(i18nConfig)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
