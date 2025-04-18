export interface CadastroObraInterface {
  id?: number
  nome?: string
  cnpj?: string
  endereco?: string
  responsavelObra?: string
  contato?: string
  previsaoEntrega?: Date
  tipoObra?: string
  plantasIguais?: boolean
  qtdCasas?: number
  grupoCasas?: string
  estruturaPredio?: string
  qtdAptoPorAndar?: number
  andares?: number
  qtdAptos?: number
  grupoAndares?: string
  padraoCorId?: string
  solidaMadeirada?: string
  coresTiposId?: string
  createdAt?: Date
  updatedAt?: Date
}
