import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from "src/app/services/languages.service"

@Component({
    selector: "/pacote-item-list",
    templateUrl: ".//pacote-item-list.component.html",
})
export class PacoteItemListComponent implements OnInit {
    public literals: any = {}

    public initialFields = []

    constructor(private languagesService: LanguagesService) {}

    ngOnInit() {
        this.getLiterals()
    }

    public kanbanData = [
        {
            title: "Novo",
            items: [
                {
                    id: 1,
                    title: "Orçamento 101",
                    subtitle: "Cliente A",
                    status: "Aberto",
                    description: "Criação de novo website",
                },
                { id: 2, title: "Orçamento 102", subtitle: "Cliente B", status: "Aberto", description: "Manutenção de sistema" },
            ],
        },
        {
            title: "Em Negociação",
            items: [
                { id: 3, title: "Orçamento 103", subtitle: "Cliente C", status: "Negociando", description: "Consultoria de TI" },
            ],
        },
        {
            title: "Aprovado",
            items: [
                { id: 4, title: "Orçamento 104", subtitle: "Cliente D", status: "Fechado", description: "Treinamento de equipe" },
            ],
        },
        {
            title: "Pedido",
            items: [{ id: 5, title: "Pedido 001", subtitle: "Cliente E", status: "Pedido", description: "Implantação de ERP" }],
        },
    ]

    handleCardDropped(dropEvent: any) {
        console.log("Card dropped:", dropEvent)
        const movedItem = dropEvent.item
        const previousColumnItems = dropEvent.previousContainer
        const newColumnItems = dropEvent.container

        const newColumnTitle = this.kanbanData.find((column) => column.items === newColumnItems)?.title
        const previousColumnTitle = this.kanbanData.find((column) => column.items === previousColumnItems)?.title

        console.log(`Card "${movedItem}"`)
    }

    handleCardClicked(item: any) {
        console.log("Card clicado:", item)
    }

    getLiterals() {
        this.languagesService
            .getLiterals({ type: "list", module: "operacao", options: "pacoteItem" })
            .pipe(map((res) => (this.literals = res)))
            .subscribe({
                next: () =>
                    (this.initialFields = [
                        { property: "id", key: true, visible: false },
                        { property: "nome", label: this.literals.fields.list["nome"], width: "15%" },
                        { property: "tipo", label: this.literals.fields.list["tipo"], width: "15%" },
                        { property: "descricao", label: this.literals.fields.list["descricao"], width: "70%" },
                    ]),
            })
    }
}
