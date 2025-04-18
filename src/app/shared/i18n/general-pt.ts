import { paisesFields } from "./fields/pt/comum/paises"
import { estadosFields } from "./fields/pt/comum/estados"
import { cidadesFields } from "./fields/pt/comum/cidades"
import { cepsFields } from "./fields/pt/comum/ceps"
import { funcionariosFields } from "./fields/pt/configuracao/funcionarios"
import { clientesFields } from "./fields/pt/configuracao/clientes"
import { padroesCoresFields } from "./fields/pt/configuracao/padroes-cores"
import { tiposEnchimentoFields } from "./fields/pt/configuracao/tipos-enchimento"
import { sentidosAberturaFields } from "./fields/pt/configuracao/sentidos-abertura"
import { tiposPortaFields } from "./fields/pt/configuracao/tipos-porta"
import { fechadurasFields } from "./fields/pt/configuracao/fechaduras"
import { alizaresFields } from "./fields/pt/configuracao/alizares"
import { largurasVaosFields } from "./fields/pt/configuracao/larguras-vaos"
import { alturasVaosFields } from "./fields/pt/configuracao/alturas-vaos"
import { statusNegociacoesFields } from "./fields/pt/configuracao/status-negociacoes"
import { pedidosFields } from "./fields/pt/operacao/pedidos"
import { pedidosItemsFields } from "./fields/pt/operacao/pedidos-items"
import { pacotesFields } from "./fields/pt/operacao/pacotes"
import { pacotesItemsFields } from "./fields/pt/operacao/pacotes-items"
import { cadastroObrasFields } from "./fields/pt/operacao/cadastro-obras"
import { medicoesFields } from "./fields/pt/operacao/medicoes"
import { negociacoesFields } from "./fields/pt/operacao/negociacoes"

export const generalPt = {
  list: {
    new: "Novo",
    edit: "Editar",
    copy: "Copiar",
    view: "Visualizar",
    delete: "Excluir",
    refresh: "Atualizar",
    search: "Pesquisar",
    otherActions: "Outras ações",
    loadingData: "Carregando dados",
    noData: "Sem dados",
    confirmExcludeTitle: "Confirmar exclusão",
    confirmExcludeMessage: "Tem certeza de que deseja excluir esse registro? Você não poderá desfazer essa ação.",
    confirmMultiExcludeTitle: "Confirmar exclusão em lote",
    confirmMultiExcludeMessage: "Tem certeza de que deseja excluir todos esses registros? Você não poderá desfazer essa ação.",
    excludeSuccess: "Item excluído com sucesso.",
    multiExcludeSuccess: "Itens excluídos com sucesso.",
    advancedFilterApplied: "Filtro customizado",
    filterCloseModal: "Fechar",
    filterApplyModal: "Filtrar",
    filterField: "Campo",
    filterOperator: "Operador",
    filterValue: "Valor",
    filterOr: "OU",
    filterAnd: "E",
    filterClear: "Limpar",
    filterAdd: "Adicionar",
    filterExpression: "Expressão",
    filterSavedFilters: "Filtros Salvos",
    filterExcludeSavedFilter: "Excluir",
    filterSaveFilterName: "Nome",
    filterSaveNew: "Salvar novo",
    filterApply: "Aplicar",
  },
  edit: {
    save: "Salvar",
    saveAndNew: "Salvar e novo",
    cancel: "Cancelar",
    return: "Voltar",
    saveSuccess: "Registro salvo com sucesso!",
    formError: "Formulário precisa ser preenchido corretamente.",
  },
  menu: {
    home: "Início",
    profile: "Perfil",
    signOut: "Sair",
    Segurança: "Segurança",
    "Motivos de Bloqueio": "Motivos de Bloqueio",
    "Grupos de Usuários": "Grupos de Usuários",
    Usuários: "Usuários",
    Módulos: "Módulos",
    "Opções de Menu": "Opções de Menu",
    Perfis: "Perfis",
    "Usuários x Perfis": "Usuários x Perfis",
    Navegação: "Navegação",
  },
  security_blockReason: {
    title: "Motivos de Bloqueio",
    fields: {
      id: "",
      code: "Código",
      description: "Descrição",
      instructionsToSolve: "Instruções de Solução",
      isSolvedByPasswordReset: "Resolve com reset de senha",
      disabled: "Inativo",
    },
  },
  security_userGroup: {
    title: "Grupos de Usuário",
    fields: {
      id: "",
      name: "Nome",
      disabled: "Inativo",
    },
  },
  security_user: {
    title: "Usuários",
    fields: {
      id: "",
      userGroupName: "Grupo de Usuário",
      userGroupId: "Grupo de Usuário",
      name: "Nome",
      login: "E-Mail",
      password: "Senha",
      disabled: "Inativo",
      mustChangePasswordNextLogon: "Deve trocar a senha no próximo logon",
      mustActiveTwoFactorAuthentication: "Deve ativar a autenticação de dois fatores",
      isBlocked: "Bloqueado",
      blockReasonId: "Motivo de bloqueio",
      disableTwoFactorAuthentication: "Desabilitar a autenticação de dois fatores",
      isAdmin: "Admin",
      isSuperUser: "Super Usuário",
      general: "Geral",
      security: "Segurança",
      twoFactorAuthentication: "Autenticação de Dois Fatores",
      properties: "Propiedades",
    },
  },
  security_module: {
    title: "Módulos",
    fields: {
      id: "",
      name: "Nome",
      disabled: "Inativo",
    },
  },
  security_menuOption: {
    title: "Opções de Menu",
    fields: {
      id: "",
      moduleName: "Módulo",
      moduleId: "Módulo",
      sequence: "Sequência",
      label: "Título",
      route: "Rota",
      icon: "Ícone",
      key: "Key",
      disabled: "Desativado",
    },
  },
  security_profile: {
    title: "Perfis",
    fields: {
      id: "",
      userGroupName: "Grupo de Usuário",
      name: "Nome",
      disabled: "Inativo",
      module: "Módulo",
      menuOption: "Opção de Menu",
      all: "Todos",
      create: "Incluir",
      view: "Visualizar",
      update: "Editar",
      remove: "Deletar",
    },
  },
  security_userProfile: {
    title: "Usuário x Perfil",
    fields: {
      id: "",
      userName: "Usuário",
      userId: "Usuário",
      profileName: "Perfil",
      profileId: "Perfil",
    },
  },
  security_navigation: {
    title: "Navegação",
    fields: {
      id: "",
      userName: "Usuário",
      userId: "Usuário",
      navigationDate: "Data",
      route: "Rota",
    },
  },
  comum_pais: {
    title: "Países",
    fields: paisesFields,
  },
  comum_estado: {
    title: "Estados",
    fields: estadosFields,
  },
  comum_cidade: {
    title: "Cidades",
    fields: cidadesFields,
  },
  comum_cep: {
    title: "CEP",
    fields: cepsFields,
  },
  configuracao_funcionario: {
    title: "Funcionarios",
    fields: funcionariosFields,
  },
  configuracao_cliente: {
    title: "Clientes",
    fields: clientesFields,
  },
  configuracao_padraoCor: {
    title: "Padrões Cores",
    fields: padroesCoresFields,
  },
  configuracao_tipoEnchimento: {
    title: "Tipos Enchimento",
    fields: tiposEnchimentoFields,
  },
  configuracao_sentidoAbertura: {
    title: "Sentidos Abertura",
    fields: sentidosAberturaFields,
  },
  configuracao_tipoPorta: {
    title: "Tipos Porta",
    fields: tiposPortaFields,
  },
  configuracao_fechadura: {
    title: "Fechaduras",
    fields: fechadurasFields,
  },
  configuracao_alizar: {
    title: "Alizares",
    fields: alizaresFields,
  },
  configuracao_larguraVaos: {
    title: "Larguras Vãos",
    fields: largurasVaosFields,
  },
  configuracao_alturaVaos: {
    title: "Alturas Vãos",
    fields: alturasVaosFields,
  },
  configuracao_statusNegociacao: {
    title: "Status",
    fields: statusNegociacoesFields,
  },
  operacao_pedido: {
    title: "Pedidos",
    fields: pedidosFields,
  },
  operacao_pedidoItem: {
    title: "Pedidos Items",
    fields: pedidosItemsFields,
  },
  operacao_pacote: {
    title: "Pacotes",
    fields: pacotesFields,
  },
  operacao_pacoteItem: {
    title: "Pacotes Items",
    fields: pacotesItemsFields,
  },
  operacao_cadastroObra: {
    title: "Cadastro Obras",
    fields: cadastroObrasFields,
  },
  operacao_medicao: {
    title: "Medições",
    fields: medicoesFields,
  },
  operacao_negociacao: {
    title: "Negociacões",
    fields: negociacoesFields,
  },
}
