import { HttpClient } from "@angular/common/http"
import { ImportExcelModalComponent } from "./../../../../components/import-excel-modal-component/import-excel-modal-component"
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core"
import { FormBuilder, FormArray, FormGroup } from "@angular/forms"
import { PoNotificationService } from "@po-ui/ng-components"
import { map } from "rxjs/operators"
import { CustomTableComponent } from "src/app/components/custom-table/custom-table.component"
import { ExcelService } from "src/app/services/excel.service"
import { LanguagesService } from "src/app/services/languages.service"
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { ActivatedRoute, Router } from "@angular/router"

@Component({
    selector: "/pedido-list",
    templateUrl: ".//pedido-list.component.html",
    styles: [
        `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }

            .modal-content {
                background: white;
                border-radius: 0;
                width: 80%;
                height: 80%;
                overflow-y: auto;
                box-shadow: none;
                pointer-events: auto;
                position: relative;
                z-index: 1001;
            }

            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid #eee;
            }

            .modal-header h3 {
                margin: 0;
            }

            .close-btn {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .modal-body {
                padding: 20px;
            }

            .modal-body p {
                margin: 10px 0;
            }

            .modal-body hr {
                margin: 15px 0;
                border: none;
                border-top: 1px solid #eee;
            }

            .confirmation-modal {
                background: white;
                border-radius: 8px;
                width: 400px;
                max-width: 90%;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }

            .confirmation-header {
                padding: 20px;
                border-bottom: 1px solid #eee;
            }

            .confirmation-header h3 {
                margin: 0;
            }

            .confirmation-body {
                padding: 20px;
            }

            .confirmation-footer {
                padding: 20px;
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                border-top: 1px solid #eee;
            }

            .btn {
                padding: 10px 20px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
            }

            .btn-secondary {
                background: #6c757d;
                color: white;
            }

            .btn-primary {
                background: #007bff;
                color: white;
            }

            .btn:hover {
                opacity: 0.8;
            }

            .item-form {
                margin-bottom: 20px;
                padding: 15px;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                background-color: #f9f9f9;
                position: relative;
                z-index: 1;
            }

            .item-header {
                margin-bottom: 15px;
            }

            .item-header h4 {
                margin: 0;
                color: #333;
                font-size: 16px;
                font-weight: 600;
            }

            .item-fields {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }

            .field-group {
                display: flex;
                flex-direction: column;
            }

            .field-group label {
                font-weight: 500;
                margin-bottom: 5px;
                color: #555;
                font-size: 14px;
            }

            .form-control {
                padding: 8px 12px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 14px;
                transition: border-color 0.3s ease;
                pointer-events: auto !important;
                cursor: text !important;
                position: relative;
                z-index: 10;
                background-color: white;
            }

            .form-control:focus {
                outline: none;
                border-color: #007bff;
                box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
            }

            .form-control[readonly] {
                background-color: #f8f9fa;
                color: #6c757d;
            }

            input[type="text"],
            input[type="number"] {
                pointer-events: auto !important;
                cursor: text !important;
                position: relative;
                z-index: 100;
            }

            .modal-footer {
                padding: 20px;
                border-top: 1px solid #eee;
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }
        `,
    ],
})
export class PedidoListComponent implements OnInit {
    public literals: any = {}
    public initialFields = []

    @ViewChild(CustomTableComponent) customTable: CustomTableComponent
    @ViewChild(ImportExcelModalComponent) modal: ImportExcelModalComponent

    public isHideLoading = true
    public uploadRoute = `${environment.baseUrl}/pedidos/import`
    public downloadRoute = ""
    public downloadExcelFileName = ""
    public showModal = false
    public showCloseConfirmation = false

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

    public pedidoReturnForm = this.formBuilder.group({
        pedido: null,
        itens: null,
        itemsCriados: this.formBuilder.array([]),
    })

    get itemsCriadosArray(): FormArray {
        return this.pedidoReturnForm.get("itemsCriados") as FormArray
    }

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

    private addItemToForm(item: any) {
        const itemForm = this.formBuilder.group({
            produto: [item?.produto || ""],
            quantidade: [item?.quantidade || 0],
            unidade: [item?.unidade || null],
            quantidadeTotal: [item?.quantidadeTotal || null],
            pacoteId: [item?.pacoteId || null],

            torre: [item?.torre || ""],
            andar: [item?.andar || ""],
            apto: [item?.apto || ""],
            ambiente: [item?.ambiente || ""],
        })

        this.itemsCriadosArray.push(itemForm)
    }

    closeModal() {
        this.showCloseConfirmation = true
    }

    confirmClose() {
        this.showModal = false
        this.showCloseConfirmation = false
    }

    cancelClose() {
        this.showCloseConfirmation = false
    }

    public saveForm() {
        if (this.pedidoReturnForm.valid) {
            const formData = this.pedidoReturnForm.value

            this.restService.post("/pedidos/create-import", formData).subscribe({
                next: (res) => {
                    this.excelService.createDownloadPdf(
                        res,
                        `pedido-${new Date().toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}-${new Date().toLocaleDateString("pt-BR", { year: "numeric", month: "2-digit", day: "2-digit" })}`
                    )
                    // this.showModal = false
                    this.poNotification.success("Pedido importado com sucesso!")
                    this.customTable.updateItems()
                },
                error: (error) => {
                    this.poNotification.error("Erro ao importar pedido.")
                },
            })
        } else {
            this.poNotification.error("Por favor, preencha todos os campos obrigatórios.")
        }
    }

    public updateItem(index: number, field: string, value: any) {
        const itemControl = this.itemsCriadosArray.at(index)
        if (itemControl) {
            itemControl.get(field)?.setValue(value)
        }
    }

    public getItemValue(index: number, field: string): any {
        const itemControl = this.itemsCriadosArray.at(index)
        return itemControl?.get(field)?.value
    }

    getLiterals() {
        this.languagesService
            .getLiterals({ type: "list", module: "operacao", options: "pedido" })
            .pipe(map((res) => (this.literals = res)))
            .subscribe({
                next: () =>
                    (this.initialFields = [
                        { property: "id", key: true, visible: false },
                        { property: "sequencial", label: this.literals.fields.list["sequencial"], width: "10%" },
                        { property: "cliente", label: this.literals.fields.list["cliente"] },
                        { property: "dataEmissao", label: this.literals.fields.list["dataEmissao"] },
                    ]),
            })
    }

    public openModal() {
        this.modal.openModal()
    }

    public importSuccess() {
        this.customTable.updateItems()
    }

    public handleResultItens(event: any) {
        this.pedidoReturnForm.patchValue({
            pedido: event.pedido,
            itens: event.itens,
        })

        this.itemsCriadosArray.clear()
        if (event.itemsCriados && Array.isArray(event.itemsCriados)) {
            event.itemsCriados.forEach((item: any) => {
                this.addItemToForm(item)
            })
        }
        this.showModal = true
    }
}
