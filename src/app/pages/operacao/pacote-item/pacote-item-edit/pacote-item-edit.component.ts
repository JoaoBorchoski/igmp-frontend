import { HttpClient } from "@angular/common/http"
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification, PoLookupColumn } from "@po-ui/ng-components"
import { FormBuilder } from "@angular/forms"
import { Subscription } from "rxjs"
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { LanguagesService } from "src/app/services/languages.service"

@Component({
    selector: "app-pacote-item-edit",
    templateUrl: "./pacote-item-edit.component.html",
    styleUrls: ["./pacote-item-edit.component.scss"],
})
export class PacoteItemEditComponent implements OnInit, OnDestroy {
    public id: string
    public readonly = false
    public result: any
    public literals: any = {}
    columnsFornecedor: Array<PoLookupColumn> = [{ property: "label", label: "Nome" }]

    // alturaPorta
    // larguraPorta
    // espessuraPorta
    // larguraBatatente
    // espessuraCanalAlizar

    pacoteItemForm = this.formBuilder.group({
        pacoteId: null,
        produto: "",
        quantidade: 0,
        nome: "",
        descricao: "",
        tipo: null,
        sentidoAbertura: null,
        tipoPorta: null,
        tipoEnchimento: null,
        fechadura: null,
        alturaPorta: 0,
        larguraPorta: 0,
        espessuraPorta: 0,
        larguraBatatente: 0,
        espessuraCanalAlizar: 0,
    })

    public readonly serviceApi = `${environment.baseUrl}/pacotes-items`
    public readonly pacoteIdService = `${environment.baseUrl}/pacotes/select`
    public readonly sentidoAberturaIdService = `${environment.baseUrl}/sentidos-abertura/select`
    public readonly tipoPortaIdService = `${environment.baseUrl}/tipos-porta/select`
    public readonly tipoEnchimentoIdService = `${environment.baseUrl}/tipos-enchimento/select`
    public readonly fechaduraIdService = `${environment.baseUrl}/fechaduras/select`

    subscriptions = new Subscription()

    public readonly pageActions: Array<PoPageAction> = []

    public readonly tipoOptions = [
        { label: "Peça Final", value: 0 },
        { label: "Kit", value: 1 },
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
            this.subscriptions.add(this.getPacoteItem(this.id))
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    getLiterals() {
        this.languagesService.getLiterals({ type: "edit", module: "operacao", options: "pacoteItem" }).subscribe({
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
                action: () => this.save(this.pacoteItemForm.value),
            },
            {
                label: this.literals.saveAndNew,
                action: () => this.save(this.pacoteItemForm.value, true),
            },
            {
                label: this.literals.cancel,
                action: this.goBack.bind(this),
            }
        )

        return
    }

    getPacoteItem(id: string) {
        this.restService.get(`/produtos/${id}`).subscribe({
            next: (result) => {
                console.log(result)
                this.pacoteItemForm.patchValue({
                    nome: result.nome,
                    descricao: result.descricao,
                    tipo: result.tipo,
                    sentidoAbertura: result.sentidoAbertura,
                    tipoPorta: result.tipoPorta,
                    tipoEnchimento: result.tipoEnchimento,
                    fechadura: result.fechadura,
                    alturaPorta: result.alturaPorta,
                    larguraPorta: result.larguraPorta,
                    espessuraPorta: result.espessuraPorta,
                    larguraBatatente: result.larguraBatatente,
                    espessuraCanalAlizar: result.espessuraCanalAlizar,
                })
            },
            error: (error) => console.log(error),
        })
    }

    save(data, willCreateAnother?: boolean) {
        if (this.pacoteItemForm.valid) {
            if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === "edit") {
                this.subscriptions.add(
                    this.restService.put(`/produtos/${this.id}`, data).subscribe({
                        next: () => {
                            this.poNotification.success({
                                message: this.literals.saveSuccess,
                                duration: environment.poNotificationDuration,
                            })

                            if (willCreateAnother) {
                                this.pacoteItemForm.reset()
                                this.router.navigate(["produtos/new"])
                            } else {
                                this.router.navigate(["produtos"])
                            }
                        },
                        error: (error) => console.log(error),
                    })
                )
            } else {
                this.subscriptions.add(
                    this.restService.post("/produtos", data).subscribe({
                        next: () => {
                            this.poNotification.success({
                                message: this.literals.saveSuccess,
                                duration: environment.poNotificationDuration,
                            })

                            if (willCreateAnother) {
                                this.pacoteItemForm.reset()
                                this.router.navigate(["produtos/new"])
                            } else {
                                this.router.navigate(["produtos"])
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
        this.pacoteItemForm.controls.pacoteId.markAsDirty()
        this.pacoteItemForm.controls.produto.markAsDirty()
    }

    goBack() {
        this.router.navigate(["pacotes-items"])
    }

    onTipoChange(tipo) {
        if (tipo === 0) {
            this.pacoteItemForm.patchValue({
                sentidoAbertura: null,
                tipoPorta: null,
                tipoEnchimento: null,
                fechadura: null,
                alturaPorta: 0,
                larguraPorta: 0,
                espessuraPorta: 0,
                larguraBatatente: 0,
                espessuraCanalAlizar: 0,
            })
        }
    }
}
