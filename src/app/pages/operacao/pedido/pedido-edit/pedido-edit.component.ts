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
  })

  public readonly serviceApi = `${environment.baseUrl}/pedidos`
  public estadoIdService = `${environment.baseUrl}/estados/select`
  public cidadeIdService = `${environment.baseUrl}/cidades/select`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public statusIdService = `${environment.baseUrl}/status-negociacoes/select`

  subscriptions = new Subscription()

  public readonly pageActions: Array<PoPageAction> = []

  columnsFornecedor: Array<PoLookupColumn> = [{ property: "label", label: "Nome" }]

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
        this.estadoId = result.estadoId
        this.pedidoForm.patchValue({
          sequencial: result.sequencial,
          cliente: result.cliente,
          telefone: result.telefone,
          cep: result.cep,
          endereco: result.endereco,
          numero: result.numero,
          complemento: result.complemento,
          bairro: result.bairro,
          estadoId: result.estadoId,
          cidadeId: result.cidadeId,
          status: result.status,
        })
      },
      error: (error) => console.log(error),
    })
  }

  estadoIdChange(event: string) {
    this.cidadeIdService = `${environment.baseUrl}/cidades/select?estadoId=${event}`
  }

  save(data, willCreateAnother?: boolean) {
    if (this.pedidoForm.valid) {
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
}
