import { HttpClient } from "@angular/common/http"
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import {
    PoDynamicFormField,
    PoPageAction,
    PoNotificationService,
    PoNotification,
    PoLookupColumn,
    PoTableAction,
    PoModalComponent,
    PoTableComponent,
    PoModalAction,
} from "@po-ui/ng-components"
import { FormArray, FormBuilder } from "@angular/forms"
import { Subscription } from "rxjs"
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { LanguagesService } from "src/app/services/languages.service"
import { ExcelService } from "src/app/services/excel.service"

@Component({
    selector: "app-pacote-edit",
    templateUrl: "./pacote-edit.component.html",
    styleUrls: ["./pacote-edit.component.scss"],
})
export class PacoteEditComponent implements OnInit, OnDestroy {
    public id: string
    public readonly = false
    public result: any
    public literals: any = {}

    public tableActions: PoTableAction[] = [
        { label: "Editar", action: this.editParameterItem.bind(this), icon: "fa-solid fa-pen" },
        { label: "Excluir", action: this.deleteParameterItem.bind(this), icon: "fa-solid fa-trash" },
    ]

    public deleteItemName: string
    public deleteItemObj: any

    @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent
    @ViewChild("poModalDelete", { static: true }) poModalDelete: PoModalComponent
    @ViewChild(PoTableComponent) table: PoTableComponent

    public primaryActionDelete: PoModalAction = {
        label: "Excluir",
        action: () => this.deleteItem(),
    }

    public secondaryActionDelete: PoModalAction = {
        label: "Cancelar",
        action: () => this.poModalDelete.close(),
    }

    public primaryAction: PoModalAction = {
        label: "Atualizar",
        action: () => this.editItem(),
    }

    public secondaryAction: PoModalAction = {
        label: "Cancelar",
        action: () => {
            this.pacoteItemsFormEdit.reset()
            this.poModal.close()
        },
    }

    pacoteForm = this.formBuilder.group({
        id: "",
        pedidoId: null,
        descricao: "",
        pacoteItems: this.formBuilder.array([]),
        pacoteTipo: 1,
    })

    pacoteItemsForm = this.formBuilder.group({
        id: "",
        quantidade: null,
        produtoId: "",
        produto: "",
    })

    pacoteItemsFormEdit = this.formBuilder.group({
        id: "",
        quantidade: null,
        produtoId: "",
        produto: "",
    })

    public pacoteTipos = [
        { label: "Pedido", value: 0 },
        { label: "Movimentação Interna", value: 1 },
    ]

    public readonly serviceApi = `${environment.baseUrl}/pacotes`
    public pedidoIdService = `${environment.baseUrl}/pedidos/select`
    public pedidoItemsIdService = `${environment.baseUrl}/pedidos-items/selectPedido`
    public produtoIdService = `${environment.baseUrl}/produtos/select`

    columnsFornecedor: Array<PoLookupColumn> = [{ property: "label", label: "Pedido" }]

    public readonly columnsTableItems = [
        { property: "id", key: true, visible: false },
        { property: "produto", label: "Produto" },
        { property: "quantidade", label: "Quantidade", width: "10%" },
    ]

    columnsProduto: Array<PoLookupColumn> = [
        { property: "label", label: "Nome" },
        { property: "nome", label: "Código", width: "15%" },
    ]

    subscriptions = new Subscription()

    public readonly pageActions: Array<PoPageAction> = []

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

    ngOnInit(): void {
        this.getLiterals()

        this.id = this.activatedRoute.snapshot.paramMap.get("id")

        this.pageButtonsBuilder(this.getPageType(this.activatedRoute.snapshot.routeConfig.path))

        if (this.id) {
            this.subscriptions.add(this.getPacote(this.id))
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    getLiterals() {
        this.languagesService.getLiterals({ type: "edit", module: "operacao", options: "pacote" }).subscribe({
            next: (res) => (this.literals = res),
        })
    }

    getPageType(route: string): string {
        switch (route) {
            case "new":
                return "new"
            case "new/:id":
                return "new"
            case "edit":
                return "edit"
            case "edit/:id":
                return "edit"
            case "view/:id":
                return "view"
        }
    }

    pageButtonsBuilder(pageType: string): null {
        if (pageType === "view") {
            this.readonly = true

            this.pageActions.push({
                label: this.literals.return,
                action: this.goBack.bind(this),
            })
            return
        }

        this.pageActions.push(
            {
                label: this.literals.save,
                action: () => this.save(this.pacoteForm.value),
            },
            {
                label: this.literals.saveAndNew,
                action: () => this.save(this.pacoteForm.value, true),
            },
            {
                label: this.literals.cancel,
                action: this.goBack.bind(this),
            }
        )

        return
    }

    getPacote(id: string) {
        this.restService.get(`/pacotes/${id}`).subscribe({
            next: (result) => {
                this.pacoteForm.patchValue({
                    pedidoId: result.pedidoId,
                    descricao: result.descricao,
                })
            },
            error: (error) => console.log(error),
        })
    }

    save(data, willCreateAnother?: boolean) {
        if (this.pacoteForm.valid && this.pacoteForm.get("pacoteItems").value.length > 0) {
            if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === "edit") {
                this.subscriptions.add(
                    this.restService.put(`/pacotes/${this.id}`, data).subscribe({
                        next: () => {
                            this.poNotification.success({
                                message: this.literals.saveSuccess,
                                duration: environment.poNotificationDuration,
                            })

                            if (willCreateAnother) {
                                this.pacoteForm.reset()
                                this.router.navigate(["pacotes/new"])
                            } else {
                                this.router.navigate(["pacotes"])
                            }
                        },
                        error: (error) => console.log(error),
                    })
                )
            } else {
                this.subscriptions.add(
                    this.restService.post("/pacotes", data).subscribe({
                        next: (result: Blob) => {
                            this.poNotification.success({
                                message: this.literals.saveSuccess,
                                duration: environment.poNotificationDuration,
                            })

                            this.excelService.createDownloadPdf(result, `pacote-${data.id || data.pedidoId}`)

                            if (willCreateAnother) {
                                // this.pacoteForm.reset()
                                // this.router.navigate(["pacotes/new"])
                            } else {
                                // this.router.navigate(["pacotes"])
                            }
                        },
                        error: (error) => console.log(error),
                    })
                )
            }
        } else {
            this.markAsDirty()
            this.poNotification.warning({
                message: this.literals.formError,
                duration: environment.poNotificationDuration,
            })
        }
    }

    downloadPDF(pdfBlob: Blob) {
        if (pdfBlob && pdfBlob.size > 0) {
            const url = window.URL.createObjectURL(pdfBlob)
            const a = document.createElement("a")
            a.href = url
            a.download = "pacote.pdf" // Nome do arquivo PDF
            a.click()
            window.URL.revokeObjectURL(url) // Libera o URL criado
        } else {
            console.error("Erro: O PDF não foi gerado corretamente.")
            console.log("Blob:", pdfBlob)
        }
    }

    markAsDirty() {
        this.pacoteForm.controls.pedidoId.markAsDirty()
    }

    goBack() {
        this.router.navigate(["pacotes"])
    }

    addItem() {
        if (this.pacoteItemsForm.valid) {
            const item = this.pacoteItemsForm.value

            if (this.itemAlreadyExists(item)) {
                this.poNotification.warning({
                    message: "Item já adicionado ao pacote.",
                    duration: environment.poNotificationDuration,
                })
                return
            }

            if (this.pacoteForm.get("pacoteTipo").value === 0) {
                this.restService.get(`/pedidos-items/produto/${item.id}`).subscribe({
                    next: (result) => {
                        console.log("Produto encontrado:", result)
                        const newProduto = {
                            ...item,
                            produto: `${result.produtoNome} - ${result.produtoDescricao}`,
                            produtoId: result.produto,
                        }

                        const pedidoItems = this.pacoteForm.get("pacoteItems") as FormArray
                        pedidoItems.push(this.formBuilder.group(newProduto))

                        this.pacoteItemsForm.reset()
                    },
                    error: (error: any) => {
                        console.log("Erro ao buscar produto:", error)
                        return null
                    },
                })
            } else {
                this.restService.get(`/produtos/${item.id}`).subscribe({
                    next: (result) => {
                        const newProduto = {
                            ...item,
                            produto: result.nomeCompleto,
                            produtoId: result.id,
                        }

                        const pedidoItems = this.pacoteForm.get("pacoteItems") as FormArray
                        pedidoItems.push(this.formBuilder.group(newProduto))

                        this.pacoteItemsForm.reset()
                    },
                    error: (error: any) => {
                        console.log("Erro ao buscar produto:", error)
                        return null
                    },
                })
            }
        } else {
            this.poNotification.warning({
                message: this.literals.formError,
                duration: environment.poNotificationDuration,
            })
        }
    }

    editParameterItem(item: any) {
        console.log("Editando item:", item)

        this.pacoteItemsFormEdit.patchValue({
            id: item.id,
            quantidade: item.quantidade,
        })

        this.poModal.open()
    }

    deleteParameterItem(item: any) {
        const pedidoItems = this.pacoteForm.get("pacoteItems") as FormArray
        const index = pedidoItems.controls.findIndex((ctrl: any) => ctrl.value.id === item.id)

        this.deleteItemName = item.produto
        this.deleteItemObj = item

        this.poModalDelete.open()
    }

    deleteItem() {
        const pedidoItems = this.pacoteForm.get("pacoteItems") as FormArray
        const index = pedidoItems.controls.findIndex((ctrl: any) => ctrl.value.id === this.deleteItemObj.id)

        if (index > -1) {
            pedidoItems.removeAt(index)

            this.poNotification.success({
                message: `${this.deleteItemName} excluído com sucesso.`,
                duration: environment.poNotificationDuration,
            })
        } else {
            this.poNotification.warning({
                message: "Item não encontrado.",
                duration: environment.poNotificationDuration,
            })
        }

        this.poModalDelete.close()
    }

    editItem() {
        if (this.pacoteItemsFormEdit.valid) {
            const item = this.pacoteItemsFormEdit.value
            const itemsArray: any = this.pacoteForm.get("pacoteItems").value
            const index = itemsArray.findIndex((ctr: any) => ctr.id === item.id)

            if (index > -1) {
                itemsArray[index].quantidade = item.quantidade

                this.pacoteForm.get("pacoteItems").setValue(itemsArray)

                this.pacoteItemsFormEdit.reset()

                this.poNotification.success({
                    message: "Item atualizado com sucesso.",
                    duration: environment.poNotificationDuration,
                })
            } else {
                this.poNotification.warning({
                    message: "Item não encontrado.",
                    duration: environment.poNotificationDuration,
                })
            }
        } else {
            this.poNotification.warning({
                message: this.literals.formError,
                duration: environment.poNotificationDuration,
            })
        }

        this.poModal.close()
    }

    itemAlreadyExists(item: any): boolean {
        const pedidoItems = this.pacoteForm.get("pacoteItems") as FormArray
        return pedidoItems.controls.some((control) => control.value.id === item.id)
    }

    onChangePacoteTipo(event: any) {
        console.log("Pacote tipo alterado:", event)
        this.pacoteForm.reset({
            pacoteTipo: event,
            pacoteItems: [],
        })
        this.pacoteItemsForm.reset()
    }
}
