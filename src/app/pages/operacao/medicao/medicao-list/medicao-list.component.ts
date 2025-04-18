import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from "src/app/services/languages.service"

@Component({
  selector: "/medicao-list",
  templateUrl: ".//medicao-list.component.html",
})
export class MedicaoListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) {}

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: "list", module: "operacao", options: "medicao" })
      .pipe(map((res) => (this.literals = res)))
      .subscribe({
        next: () =>
          (this.initialFields = [
            { property: "id", key: true, visible: false },
            { property: "complemento", label: "Complemento", type: "string" },
            { property: "obra", label: "Obra", type: "string" },
          ]),
      })
  }
}
