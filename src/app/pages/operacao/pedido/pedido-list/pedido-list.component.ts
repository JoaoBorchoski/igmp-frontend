import { ImportExcelModalComponent } from "./../../../../components/import-excel-modal-component/import-excel-modal-component"
import { Component, OnInit, ViewChild } from "@angular/core"
import { PoModalComponent } from "@po-ui/ng-components"
import { map } from "rxjs/operators"
import { CustomTableComponent } from "src/app/components/custom-table/custom-table.component"
import { LanguagesService } from "src/app/services/languages.service"
import { environment } from "src/environments/environment"

@Component({
  selector: "/pedido-list",
  templateUrl: ".//pedido-list.component.html",
})
export class PedidoListComponent implements OnInit {
  public literals: any = {}
  public initialFields = []

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent
  @ViewChild(CustomTableComponent) customTable: CustomTableComponent
  @ViewChild(ImportExcelModalComponent) modal: ImportExcelModalComponent

  public isHideLoading = true
  public uploadRoute = `${environment.baseUrl}/pedidos/import`
  public downloadRoute = ""
  public downloadExcelFileName = ""

  constructor(private languagesService: LanguagesService) {}

  readonly customPageActions = [
    {
      index: 2,
      pageAction: {
        label: "Importar",
        action: this.openModal.bind(this),
        icon: "fa-solid fa-file-import",
      },
    },
  ]

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: "list", module: "operacao", options: "pedido" })
      .pipe(map((res) => (this.literals = res)))
      .subscribe({
        next: () =>
          (this.initialFields = [
            { property: "id", key: true, visible: false },
            { property: "cliente", label: this.literals.fields.list["cliente"] },
            { property: "estadoUf", label: this.literals.fields.list["estadoUf"] },
          ]),
      })
  }

  public openModal() {
    this.modal.openModal()
  }

  public importSuccess() {
    this.customTable.updateItems()
  }
}
