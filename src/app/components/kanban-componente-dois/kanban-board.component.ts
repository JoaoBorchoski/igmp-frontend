import { Component, OnInit } from "@angular/core"
import { KanbanCard, KanbanColumn, KanbanBoard, StatusOrcamento } from "./interfaces/kanban.interface"

@Component({
    selector: "app-kanban-board",
    templateUrl: "./kanban-board.component.html",
})
export class KanbanBoardComponent implements OnInit {
    kanbanBoard: KanbanBoard = {
        colunas: [],
    }

    draggedCard: KanbanCard | null = null
    draggedFromColumn: string | null = null

    constructor() {}

    ngOnInit(): void {
        this.inicializarKanban()
    }

    private inicializarKanban(): void {
        this.kanbanBoard = {
            colunas: [
                {
                    id: StatusOrcamento.NOVO,
                    titulo: "Novo Orçamento",
                    cor: "#e3f2fd",
                    cards: [
                        {
                            id: "1",
                            titulo: "Orçamento Sistema ERP",
                            cliente: "Empresa ABC Ltda",
                            valor: 15000,
                            dataVencimento: new Date("2024-01-15"),
                            descricao: "Desenvolvimento de sistema ERP personalizado",
                            prioridade: "alta",
                        },
                        {
                            id: "2",
                            titulo: "Website Institucional",
                            cliente: "Consultoria XYZ",
                            valor: 8500,
                            dataVencimento: new Date("2024-01-20"),
                            descricao: "Criação de website responsivo",
                            prioridade: "media",
                        },
                    ],
                },
                {
                    id: StatusOrcamento.EM_ANALISE,
                    titulo: "Em Análise",
                    cor: "#fff3e0",
                    cards: [
                        {
                            id: "3",
                            titulo: "App Mobile E-commerce",
                            cliente: "Loja Virtual 123",
                            valor: 25000,
                            dataVencimento: new Date("2024-01-25"),
                            descricao: "Aplicativo mobile para vendas online",
                            prioridade: "alta",
                        },
                    ],
                },
                {
                    id: StatusOrcamento.AGUARDANDO_APROVACAO,
                    titulo: "Aguardando Aprovação",
                    cor: "#f3e5f5",
                    cards: [
                        {
                            id: "4",
                            titulo: "Sistema de Gestão",
                            cliente: "Indústria DEF",
                            valor: 35000,
                            dataVencimento: new Date("2024-02-01"),
                            descricao: "Sistema completo de gestão industrial",
                            prioridade: "alta",
                        },
                    ],
                },
                {
                    id: StatusOrcamento.APROVADO,
                    titulo: "Aprovado",
                    cor: "#e8f5e8",
                    cards: [
                        {
                            id: "5",
                            titulo: "Portal do Cliente",
                            cliente: "Empresa GHI S.A.",
                            valor: 12000,
                            dataVencimento: new Date("2024-02-10"),
                            descricao: "Portal web para clientes",
                            prioridade: "media",
                        },
                    ],
                },
                {
                    id: StatusOrcamento.PEDIDO,
                    titulo: "Pedido",
                    cor: "#e1f5fe",
                    cards: [
                        {
                            id: "6",
                            titulo: "Dashboard Analytics",
                            cliente: "StartUp JKL",
                            valor: 18000,
                            dataVencimento: new Date("2024-02-15"),
                            descricao: "Dashboard de analytics em tempo real",
                            prioridade: "baixa",
                        },
                    ],
                },
            ],
        }
    }

    // Funções de Drag and Drop
    onDragStart(event: DragEvent, card: KanbanCard, columnId: string): void {
        this.draggedCard = card
        this.draggedFromColumn = columnId
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = "move"
            event.dataTransfer.setData("text/html", card.id)
        }
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault()
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "move"
        }
    }

    onDrop(event: DragEvent, targetColumnId: string): void {
        event.preventDefault()

        if (this.draggedCard && this.draggedFromColumn && this.draggedFromColumn !== targetColumnId) {
            // Remove o card da coluna origem
            const sourceColumn = this.kanbanBoard.colunas.find((col) => col.id === this.draggedFromColumn)
            if (sourceColumn) {
                const cardIndex = sourceColumn.cards.findIndex((card) => card.id === this.draggedCard!.id)
                if (cardIndex > -1) {
                    sourceColumn.cards.splice(cardIndex, 1)
                }
            }

            // Adiciona o card na coluna destino
            const targetColumn = this.kanbanBoard.colunas.find((col) => col.id === targetColumnId)
            if (targetColumn) {
                targetColumn.cards.push(this.draggedCard)
            }

            // Chama a função de callback para movimentação
            this.onCardMoved(this.draggedCard, this.draggedFromColumn, targetColumnId)
        }

        this.draggedCard = null
        this.draggedFromColumn = null
    }

    // Função para ser implementada pelo usuário
    onCardMoved(card: KanbanCard, fromColumn: string, toColumn: string): void {
        // TODO: Implementar lógica de movimentação do card
        // Esta função será chamada sempre que um card for movido entre colunas
        console.log("Card movido:", { card, fromColumn, toColumn })
    }

    // Função para clique no card
    onCardClick(card: KanbanCard): void {
        // TODO: Implementar navegação para o pedido/orçamento
        // Esta função será chamada quando um card for clicado
        console.log("Card clicado:", card)
    }

    // Função auxiliar para formatação de valor
    formatarValor(valor: number): string {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valor)
    }

    // Função auxiliar para formatação de data
    formatarData(data: Date): string {
        return new Intl.DateTimeFormat("pt-BR").format(data)
    }

    // Função para obter cor da prioridade
    getCorPrioridade(prioridade: string): string {
        switch (prioridade) {
            case "alta":
                return "#f44336"
            case "media":
                return "#ff9800"
            case "baixa":
                return "#4caf50"
            default:
                return "#9e9e9e"
        }
    }
}
