import { paisesFields } from './fields/en/comum/paises'
import { estadosFields } from './fields/en/comum/estados'
import { cidadesFields } from './fields/en/comum/cidades'
import { cepsFields } from './fields/en/comum/ceps'
import { funcionariosFields } from './fields/en/configuracao/funcionarios'
import { clientesFields } from './fields/en/configuracao/clientes'
import { padroesCoresFields } from './fields/en/configuracao/padroes-cores'
import { tiposEnchimentoFields } from './fields/en/configuracao/tipos-enchimento'
import { sentidosAberturaFields } from './fields/en/configuracao/sentidos-abertura'
import { tiposPortaFields } from './fields/en/configuracao/tipos-porta'
import { fechadurasFields } from './fields/en/configuracao/fechaduras'
import { alizaresFields } from './fields/en/configuracao/alizares'
import { largurasVaosFields } from './fields/en/configuracao/larguras-vaos'
import { alturasVaosFields } from './fields/en/configuracao/alturas-vaos'
import { statusNegociacoesFields } from './fields/en/configuracao/status-negociacoes'
import { pedidosFields } from './fields/en/operacao/pedidos'
import { pedidosItemsFields } from './fields/en/operacao/pedidos-items'
import { pacotesFields } from './fields/en/operacao/pacotes'
import { pacotesItemsFields } from './fields/en/operacao/pacotes-items'
import { cadastroObrasFields } from './fields/en/operacao/cadastro-obras'
import { medicoesFields } from './fields/en/operacao/medicoes'
import { negociacoesFields } from './fields/en/operacao/negociacoes'

export const generalEn = {
  list: {
    new: "New",
    edit: "Edit",
    copy: "Copy",
    view: "View",
    delete: "Delete",
    refresh: "Refresh",
    search: "Search",
    otherActions: "Other actions",
    loadingData: "Loading data",
    noData: "No data",
    confirmExcludeTitle: "Confirm exclude",
    confirmExcludeMessage: "Are you sure that you want to exclude this item? You can't undo this action.",
    confirmMultiExcludeTitle: "Confirm multi item delete",
    confirmMultiExcludeMessage: "Are you sure that you want to exclude these items? You can't undo this action.",
    excludeSuccess: "Item excluded with success.",
    multiExcludeSuccess: "Items excluded with success!",
    advancedFilterApplied: "Customized filter",
    filterCloseModal: "Close",
    filterApplyModal: "Apply Filter",
    filterField: "Field",
    filterOperator: "Operator",
    filterValue: "Value",
    filterOr: "OR",
    filterAnd: "AND",
    filterClear: "Clear",
    filterAdd: "Add",
    filterExpression: "Expression",
    filterSavedFilters: "Saved Filters",
    filterExcludeSavedFilter: "Delete",
    filterSaveFilterName: "Name",
    filterSaveNew: "Save new",
    filterApply: "Apply"
  },
  edit: {
    save: "Save",
    saveAndNew: "Save and new",
    cancel: "Cancel",
    return: "Return",
    saveSuccess: "Register saved successfully!",
    formError: "Form incorrect."
  },
  menu: {
    home: 'Home',
    profile: 'Profile',
    signOut: 'Sign out',
    'Segurança': 'Security',
    'Motivos de Bloqueio': 'Block Reasons',
    'Grupos de Usuários': 'Users Group',
    'Usuários': 'Users',
    'Módulos': 'Modules',
    'Opções de Menu': 'Menu Options',
    'Perfis': 'Profiles',
    'Usuários x Perfis': 'Users x Profiles',
    'Navegação': 'Navigation',
  },
  security_blockReason: {
    title: 'Block Reasons',
    fields: {
      id: '',
      code: 'Code',
      description: 'Description',
      instructionsToSolve: 'Instructions to Solve',
      isSolvedByPasswordReset: 'Is solved by password reset',
      disabled: 'Disabled'
    }
  },
  security_userGroup: {
    title: 'User Groups',
    fields: {
      id: '',
      name: 'Name',
      disabled: 'Disabled'
    }
  },
  security_user: {
    title: 'Users',
    fields: {
      id: '',
      userGroupName: 'User Group',
      userGroupId: 'User Group',
      name: 'Name',
      login: 'E-Mail',
      password: 'Password',
      disabled: 'Disabled',
      mustChangePasswordNextLogon: 'Must change password next logon',
      mustActiveTwoFactorAuthentication: 'Must active two factor authentication',
      isBlocked: 'Blocked',
      blockReasonId: 'Blocked Reason',
      disableTwoFactorAuthentication: 'Disable Two Factor Authentication',
      isAdmin: 'Admin',
      isSuperUser: 'Super User',
      general: 'General',
      security: 'Security',
      twoFactorAuthentication: 'Two Factor Authentication',
      properties: 'Properties'
    }
  },
  security_module: {
    title: 'Modules',
    fields: {
      id: '',
      name: 'Name',
      disabled: 'Disabled'
    }
  },
  security_menuOption: {
    title: 'Menu Options',
    fields: {
      id: '',
      moduleName: 'Module',
      moduleId: 'Module',
      sequence: 'Sequence',
      label: 'Label',
      route: 'Route',
      icon: 'Icon',
      key: 'Key',
      disabled: 'Disabled'
    }
  },
  security_profile: {
    title: 'Profiles',
    fields: {
      id: '',
      userGroupName: 'User Group',
      name: 'Name',
      disabled: 'Disabled',
      module: 'Module',
      menuOption: 'Menu Option',
      all: 'All',
      create: 'Create',
      view: 'View',
      update: 'Update',
      remove: 'Delete',
    }
  },
  security_userProfile: {
    title: 'User x Profile',
    fields: {
      id: '',
      userName: 'User',
      userId: 'User',
      profileName: 'Profile',
      profileId: 'Profile',
    }
  },
  security_navigation: {
    title: 'Navigation',
    fields: {
      id: '',
      userName: 'User',
      userId: 'User',
      navigationDate: 'Date',
      route: 'Route',
    }
  },
  comum_pais: {
    title: 'Países',
    fields: paisesFields
  },
  comum_estado: {
    title: 'Estados',
    fields: estadosFields
  },
  comum_cidade: {
    title: 'Cidades',
    fields: cidadesFields
  },
  comum_cep: {
    title: 'CEP',
    fields: cepsFields
  },
  configuracao_funcionario: {
    title: 'Funcionarios',
    fields: funcionariosFields
  },
  configuracao_cliente: {
    title: 'Clientes',
    fields: clientesFields
  },
  configuracao_padraoCor: {
    title: 'PadroesCores',
    fields: padroesCoresFields
  },
  configuracao_tipoEnchimento: {
    title: 'TiposEnchimento',
    fields: tiposEnchimentoFields
  },
  configuracao_sentidoAbertura: {
    title: 'SentidosAbertura',
    fields: sentidosAberturaFields
  },
  configuracao_tipoPorta: {
    title: 'TiposPorta',
    fields: tiposPortaFields
  },
  configuracao_fechadura: {
    title: 'Fechaduras',
    fields: fechadurasFields
  },
  configuracao_alizar: {
    title: 'Alizares',
    fields: alizaresFields
  },
  configuracao_larguraVaos: {
    title: 'LargurasVaos',
    fields: largurasVaosFields
  },
  configuracao_alturaVaos: {
    title: 'AlturasVaos',
    fields: alturasVaosFields
  },
  configuracao_statusNegociacao: {
    title: 'StatusNegociacoes',
    fields: statusNegociacoesFields
  },
  operacao_pedido: {
    title: 'Pedidos',
    fields: pedidosFields
  },
  operacao_pedidoItem: {
    title: 'Pedidos Items',
    fields: pedidosItemsFields
  },
  operacao_pacote: {
    title: 'Pacotes',
    fields: pacotesFields
  },
  operacao_pacoteItem: {
    title: 'Pacotes Items',
    fields: pacotesItemsFields
  },
  operacao_cadastroObra: {
    title: 'Cadastro Obras',
    fields: cadastroObrasFields
  },
  operacao_medicao: {
    title: 'Medicoes',
    fields: medicoesFields
  },
  operacao_negociacao: {
    title: 'Negociacoes',
    fields: negociacoesFields
  },
}
