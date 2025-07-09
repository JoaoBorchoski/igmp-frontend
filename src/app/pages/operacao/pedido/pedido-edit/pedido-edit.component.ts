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
    PoModalAction,
    PoTableComponent,
} from "@po-ui/ng-components"
import { FormArray, FormBuilder } from "@angular/forms"
import { Subscription } from "rxjs"
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { LanguagesService } from "src/app/services/languages.service"

@Component({
    selector: "app-pedido-edit",
    templateUrl: "./pedido-edit.component.html",
    styleUrls: ["./pedido-edit.component.scss"],
})
export class PedidoEditComponent implements OnInit, OnDestroy {
    public id: string
    public readonly = false
    public estadoId = ""
    public result: any
    public literals: any = {}
    public tableActions: PoTableAction[] = [
        { label: "Editar", action: this.editParameterItem.bind(this), icon: "fa-solid fa-pen" },
        { label: "Excluir", action: this.deleteParameterItem.bind(this), icon: "fa-solid fa-trash" },
    ]

    public canAddItems = false
    public deleteItemName: string
    public deleteItemObj: any

    @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent
    @ViewChild("poModalDelete", { static: true }) poModalDelete: PoModalComponent

    @ViewChild(PoTableComponent) table: PoTableComponent

    pedidoForm = this.formBuilder.group({
        sequencial: 0,
        cliente: "",
        telefone: "",
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        estadoId: null,
        cidadeId: null,
        status: "",
        descricao: "",
        dataEmissao: new Date(),
        pedidoItems: this.formBuilder.array([]),
    })

    pedidoItemsForm = this.formBuilder.group({
        id: "",
        produto: null,
        quantidade: null,
    })

    pedidoItemsFormEdit = this.formBuilder.group({
        id: "",
        produto: null,
        quantidade: null,
    })

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
            this.pedidoItemsFormEdit.reset()
            this.poModal.close()
        },
    }

    public readonly columnsTableItems = [
        { property: "id", key: true, visible: false },
        { property: "produto", label: "Produto" },
        { property: "quantidade", label: "Quantidade", width: "10%" },
    ]

    public readonly serviceApi = `${environment.baseUrl}/pedidos`
    public estadoIdService = `${environment.baseUrl}/estados/select`
    public cidadeIdService = `${environment.baseUrl}/cidades/select`
    public clienteIdService = `${environment.baseUrl}/clientes/select`
    public statusIdService = `${environment.baseUrl}/status-negociacoes/select`
    public produtoIdService = `${environment.baseUrl}/produtos/select`

    subscriptions = new Subscription()

    public readonly pageActions: Array<PoPageAction> = []

    columnsFornecedor: Array<PoLookupColumn> = [{ property: "label", label: "Nome" }]

    columnsProduto: Array<PoLookupColumn> = [
        { property: "label", label: "Nome" },
        { property: "nome", label: "Código", width: "15%" },
    ]

    constructor(
        private formBuilder: FormBuilder,
        public httpClient: HttpClient,
        public restService: RestService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private poNotification: PoNotificationService,
        private languagesService: LanguagesService
    ) {}

    ngOnInit(): void {
        this.getLiterals()

        this.id = this.activatedRoute.snapshot.paramMap.get("id")

        this.pageButtonsBuilder(this.getPageType(this.activatedRoute.snapshot.routeConfig.path))

        if (this.id) {
            this.subscriptions.add(this.getPedido(this.id))
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    getLiterals() {
        this.languagesService.getLiterals({ type: "edit", module: "operacao", options: "pedido" }).subscribe({
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
                action: () => this.save(this.pedidoForm.value),
            },
            {
                label: this.literals.saveAndNew,
                action: () => this.save(this.pedidoForm.value, true),
            },
            {
                label: this.literals.cancel,
                action: this.goBack.bind(this),
            }
        )

        return
    }

    getPedido(id: string) {
        this.restService.get(`/pedidos/${id}`).subscribe({
            next: (result) => {
                this.pedidoForm.patchValue({
                    sequencial: result.sequencial,
                    cliente: result.cliente,
                    status: result.status,
                    descricao: result.descricao,
                    dataEmissao: result.dataEmissao
                        ? new Date(result.dataEmissao.split("/").reverse().join("-") + "T00:00:00")
                        : new Date(),
                    pedidoItems: [],
                })

                const pedidoItems = this.pedidoForm.get("pedidoItems") as FormArray
                result.pedidoItems.forEach((item: any) => {
                    pedidoItems.push(
                        this.formBuilder.group({
                            id: item.produtoId,
                            produto: item.produto,
                            quantidade: item.quantidade,
                        })
                    )
                })
            },
            error: (error) => console.log(error),
        })
    }

    estadoIdChange(event: string) {
        this.cidadeIdService = `${environment.baseUrl}/cidades/select?estadoId=${event}`
    }

    save(data, willCreateAnother?: boolean) {
        if (this.pedidoForm.valid && this.pedidoForm.get("pedidoItems").value.length > 0) {
            if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === "edit") {
                this.subscriptions.add(
                    this.restService.put(`/pedidos/${this.id}`, data).subscribe({
                        next: () => {
                            this.poNotification.success({
                                message: this.literals.saveSuccess,
                                duration: environment.poNotificationDuration,
                            })

                            if (willCreateAnother) {
                                this.pedidoForm.reset()
                                this.router.navigate(["pedidos/new"])
                            } else {
                                this.router.navigate(["pedidos"])
                            }
                        },
                        error: (error) => console.log(error),
                    })
                )
            } else {
                this.subscriptions.add(
                    this.restService.post("/pedidos", data).subscribe({
                        next: () => {
                            this.poNotification.success({
                                message: this.literals.saveSuccess,
                                duration: environment.poNotificationDuration,
                            })

                            if (willCreateAnother) {
                                this.pedidoForm.reset()
                                this.router.navigate(["pedidos/new"])
                            } else {
                                this.router.navigate(["pedidos"])
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

    markAsDirty() {
        this.pedidoForm.controls.sequencial.markAsDirty()
        this.pedidoForm.controls.cliente.markAsDirty()
        this.pedidoForm.controls.estadoId.markAsDirty()
        this.pedidoForm.controls.cidadeId.markAsDirty()
    }

    goBack() {
        this.router.navigate(["pedidos"])
    }

    addItem() {
        if (this.pedidoItemsForm.valid) {
            const item = this.pedidoItemsForm.value

            if (this.itemAlreadyExists(item)) {
                this.poNotification.warning({
                    message: "Produto já existe no pedido.",
                    duration: environment.poNotificationDuration,
                })
                return
            }

            this.restService.get(`/produtos/${item.id}`).subscribe({
                next: (result) => {
                    const newProduto = {
                        ...item,
                        produto: `${result.nome} - ${result.descricao}`,
                    }

                    const pedidoItems = this.pedidoForm.get("pedidoItems") as FormArray
                    pedidoItems.push(this.formBuilder.group(newProduto))

                    this.pedidoItemsForm.reset()
                },
                error: (error) => {
                    console.error("Erro ao buscar produto:", error)
                    return null
                },
            })
        } else {
            this.poNotification.warning({
                message: this.literals.formError,
                duration: environment.poNotificationDuration,
            })
        }
    }

    itemAlreadyExists(item: any): boolean {
        const pedidoItems = this.pedidoForm.get("pedidoItems") as FormArray
        return pedidoItems.controls.some((control) => control.value.id === item.id)
    }

    editParameterItem(item: any) {
        console.log("Editando item:", item)

        this.pedidoItemsFormEdit.patchValue({
            id: item.id,
            quantidade: item.quantidade,
        })

        this.poModal.open()
    }

    editItem() {
        if (this.pedidoItemsFormEdit.valid) {
            const item = this.pedidoItemsFormEdit.value
            const itemsArray: any = this.pedidoForm.get("pedidoItems").value
            const index = itemsArray.findIndex((ctr: any) => ctr.id === item.id)

            if (index > -1) {
                itemsArray[index].quantidade = item.quantidade

                this.pedidoForm.get("pedidoItems").setValue(itemsArray)

                this.pedidoItemsFormEdit.reset()

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

    deleteParameterItem(item: any) {
        const pedidoItems = this.pedidoForm.get("pedidoItems") as FormArray
        const index = pedidoItems.controls.findIndex((ctrl: any) => ctrl.value.id === item.id)

        this.deleteItemName = item.produto
        this.deleteItemObj = item

        this.poModalDelete.open()
    }

    deleteItem() {
        const pedidoItems = this.pedidoForm.get("pedidoItems") as FormArray
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

    onChangeCliente(event: any) {
        if (event) {
            this.canAddItems = true
        } else {
            this.canAddItems = false
            this.pedidoItemsForm.reset()
            this.pedidoForm.patchValue({
                cliente: "",
                telefone: "",
                cep: "",
                endereco: "",
                numero: "",
                complemento: "",
                bairro: "",
                estadoId: null,
                cidadeId: null,
                pedidoItems: [],
            })
        }
    }

    openDeleteModal(item: any) {
        this.poModalDelete.open()
    }

    onProdutoChange(event: any) {
        console.log("Produto selecionado:", event)
    }
}
