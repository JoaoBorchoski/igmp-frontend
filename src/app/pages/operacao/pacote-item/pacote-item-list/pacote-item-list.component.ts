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
