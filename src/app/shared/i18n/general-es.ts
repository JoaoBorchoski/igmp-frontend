import { paisesFields } from './fields/es/comum/paises'
import { estadosFields } from './fields/es/comum/estados'
import { cidadesFields } from './fields/es/comum/cidades'
import { cepsFields } from './fields/es/comum/ceps'
import { funcionariosFields } from './fields/es/configuracao/funcionarios'
import { clientesFields } from './fields/es/configuracao/clientes'
import { padroesCoresFields } from './fields/es/configuracao/padroes-cores'
import { tiposEnchimentoFields } from './fields/es/configuracao/tipos-enchimento'
import { sentidosAberturaFields } from './fields/es/configuracao/sentidos-abertura'
import { tiposPortaFields } from './fields/es/configuracao/tipos-porta'
import { fechadurasFields } from './fields/es/configuracao/fechaduras'
import { alizaresFields } from './fields/es/configuracao/alizares'
import { largurasVaosFields } from './fields/es/configuracao/larguras-vaos'
import { alturasVaosFields } from './fields/es/configuracao/alturas-vaos'
import { statusNegociacoesFields } from './fields/es/configuracao/status-negociacoes'
import { pedidosFields } from './fields/es/operacao/pedidos'
import { pedidosItemsFields } from './fields/es/operacao/pedidos-items'
import { pacotesFields } from './fields/es/operacao/pacotes'
import { pacotesItemsFields } from './fields/es/operacao/pacotes-items'
import { cadastroObrasFields } from './fields/es/operacao/cadastro-obras'
import { medicoesFields } from './fields/es/operacao/medicoes'
import { negociacoesFields } from './fields/es/operacao/negociacoes'

export const generalEs = {
  list: {
    new: "Nuevo",
    edit: "Editar",
    copy: "Copiar",
    view: "Visualizar",
    delete: "Borrar",
    refresh: "Actualizar",
    search: "Buscar",
    otherActions: "Otras acciones",
    loadingData: "Cargando datos",
    noData: "Sin datos",
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
    filterApply: "Aplicar"
  },
  edit: {
    save: "Save",
    saveAndNew: "Save and new",
    cancel: "Cancel",
    return: "Volver",
    saveSuccess: "Registro guardado con éxito!",
    formError: "Campos incorrectos."
  },
  menu: {
    home: 'Home',
    profile: 'Perfil',
    signOut: 'Salir',
    'Segurança': 'Seguridad',
    'Motivos de Bloqueio': 'Razones de Bloqueo',
    'Grupos de Usuários': 'Grupo de Usuario',
    'Usuários': 'Usuarios',
    'Módulos': 'Módulos',
    'Opções de Menu': 'Opciones de Menú',
    'Perfis': 'Perfiles',
    'Usuários x Perfis': 'Usuarios x Perfiles',
    'Navegação': 'Navegación',
  },
  security_blockReason: {
    title: 'Razones de Bloqueo',
    fields: {
      id: '',
      code: 'Código',
      description: 'Descripción',
      instructionsToSolve: 'Instrucciones de Solución',
      isSolvedByPasswordReset: 'Soluciona restableciendo la contraseña',
      disabled: 'Desactivado'
    }
  },
  security_userGroup: {
    title: 'Grupos de Usuario',
    fields: {
      id: '',
      name: 'Nombre',
      disabled: 'Desactivado'
    }
  },
  security_user: {
    title: 'Usuarios',
    fields: {
      id: '',
      userGroupName: 'Grupo de Usuario',
      userGroupId: 'Grupo de Usuario',
      name: 'Nombre',
      login: 'E-Mail',
      password: 'Contraseña',
      disabled: 'Inactivo',
      mustChangePasswordNextLogon: 'Debe cambiar la contraseña el próximo inicio de sesión',
      mustActiveTwoFactorAuthentication: 'Debe activar la autenticación de dos factores',
      isBlocked: 'Bloqueado',
      blockReasonId: 'Motivo de bloqueo',
      disableTwoFactorAuthentication: 'Deshabilitar la autenticación de dos factores',
      isAdmin: 'Admin',
      isSuperUser: 'Super Usuario',
      general: 'General',
      security: 'Seguridad',
      twoFactorAuthentication: 'Autenticación de Dos Factores',
      properties: 'Propiedades'
    }
  },
  security_module: {
    title: 'Módulos',
    fields: {
      id: '',
      name: 'Nombre',
      disabled: 'Desactivado'
    }
  },
  security_menuOption: {
    title: 'Opciones de Menú',
    fields: {
      id: '',
      moduleName: 'Módulo',
      moduleId: 'Módulo',
      sequence: 'Secuencia',
      label: 'Etiqueta',
      route: 'Ruta',
      icon: 'Icono',
      key: 'Key',
      disabled: 'Desactivado'
    }
  },
  security_profile: {
    title: 'Perfiles',
    fields: {
      id: '',
      userGroupName: 'Grupo de Usuario',
      name: 'Nombre',
      disabled: 'Desactivado',
      module: 'Módulo',
      menuOption: 'Opción de Menú',
      all: 'Todo',
      create: 'Crear',
      view: 'Vista',
      update: 'Actualizar',
      remove: 'Eliminar',
    }
  },
  security_userProfile: {
    title: 'Usuario x Perfil',
    fields: {
      id: '',
      userName: 'Usuario',
      userId: 'Usuario',
      profileName: 'Perfil',
      profileId: 'Perfil',
    }
  },
  security_navigation: {
    title: 'Navegación',
    fields: {
      id: '',
      userName: 'Usuario',
      userId: 'Usuario',
      navigationDate: 'Fecha',
      route: 'Ruta',
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
