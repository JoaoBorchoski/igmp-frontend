export interface KanbanCard {
    id: string
    titulo: string
    cliente: string
    valor: number
    dataVencimento: Date
    descricao?: string
    prioridade: "baixa" | "media" | "alta"
}

export interface KanbanColumn {
    id: string
    titulo: string
    cards: KanbanCard[]
    cor: string
}

export interface KanbanBoard {
    colunas: KanbanColumn[]
}

export enum StatusOrcamento {
    NOVO = "novo",
    EM_ANALISE = "em_analise",
    AGUARDANDO_APROVACAO = "aguardando_aprovacao",
    APROVADO = "aprovado",
    PEDIDO = "pedido",
}
