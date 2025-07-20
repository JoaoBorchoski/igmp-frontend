import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from "src/app/services/languages.service"

@Component({
    selector: "/pacote-list",
    templateUrl: ".//pacote-list.component.html",
})
export class PacoteListComponent implements OnInit {
    public literals: any = {}

    public initialFields = []

    constructor(private languagesService: LanguagesService) {}

    ngOnInit() {
        this.getLiterals()
    }

    getLiterals() {
        this.languagesService
            .getLiterals({ type: "list", module: "operacao", options: "pacote" })
            .pipe(map((res) => (this.literals = res)))
            .subscribe({
                next: () =>
                    (this.initialFields = [
                        { property: "id", key: true, visible: false },
                        { property: "sequencial", label: this.literals.fields.list["sequencial"], width: "20%" },
                        { property: "pedidoSequencial", label: this.literals.fields.list["pedidoSequencial"], width: "20%" },
                        { property: "descricao", label: this.literals.fields.list["descricao"] },
                    ]),
            })
    }
}
