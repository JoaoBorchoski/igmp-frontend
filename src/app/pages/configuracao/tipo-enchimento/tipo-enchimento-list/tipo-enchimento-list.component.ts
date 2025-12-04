import { HttpClient } from "@angular/common/http"
import { Component, OnInit, ViewChild } from "@angular/core"
import { FormBuilder } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { PoNotificationService } from "@po-ui/ng-components"
import { map } from "rxjs/operators"
import { CustomTableComponent } from "src/app/components/custom-table/custom-table.component"
import { ImportExcelModalComponent } from "src/app/components/import-excel-modal-component/import-excel-modal-component"
import { ExcelService } from "src/app/services/excel.service"
import { LanguagesService } from "src/app/services/languages.service"
import { RestService } from "src/app/services/rest.service"
import { environment } from "src/environments/environment"

@Component({
	selector: "/tipo-enchimento-list",
	templateUrl: ".//tipo-enchimento-list.component.html",
})
export class TipoEnchimentoListComponent implements OnInit {
	@ViewChild(CustomTableComponent) customTable: CustomTableComponent
	@ViewChild(ImportExcelModalComponent) modal: ImportExcelModalComponent
	public literals: any = {}

	public initialFields = []

	public isHideLoading = true
	public uploadRoute = `${environment.baseUrl}/produtos/import`
	public downloadRoute = ""
	public downloadExcelFileName = ""
	public showModal = false
	public showCloseConfirmation = false

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

	constructor(
		private formBuilder: FormBuilder,
		public httpClient: HttpClient,
		public restService: RestService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private poNotification: PoNotificationService,
		private languagesService: LanguagesService,
		private excelService: ExcelService
	) {}

	ngOnInit() {
		this.getLiterals()
	}

	getLiterals() {
		this.languagesService
			.getLiterals({ type: "list", module: "configuracao", options: "tipoEnchimento" })
			.pipe(map((res) => (this.literals = res)))
			.subscribe({
				next: () =>
					(this.initialFields = [
						{ property: "id", key: true, visible: false },
						{ property: "nome", label: this.literals.fields.list["nome"] },
						{ property: "tipo", label: this.literals.fields.list["tipo"] },
					]),
			})
	}

	openModal() {
		this.modal.openModal()
	}

	public importSuccess() {
		this.customTable.updateItems()
	}
}
