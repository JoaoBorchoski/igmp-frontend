export interface PedidoInterface {
  id?: number
  sequencial?: number
  cliente?: string
  telefone?: string
  cep?: string
  endereco?: string
  numero?: string
  complemento?: string
  bairro?: string
  estadoId?: string
  cidadeId?: string
  status?: string
  createdAt?: Date
  updatedAt?: Date
}
