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
  selector: "app-pedido-item-edit",
  templateUrl: "./pedido-item-edit.component.html",
  styleUrls: ["./pedido-item-edit.component.scss"],
})
export class PedidoItemEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any
  public literals: any = {}

  public estadoIdService = `${environment.baseUrl}/estados/select`
  public cidadeIdService = `${environment.baseUrl}/cidades/select`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public statusIdService = `${environment.baseUrl}/status-negociacoes/select`

  columnsFornecedor: Array<PoLookupColumn> = [{ property: "label", label: "Nome" }]

  pedidoItemForm = this.formBuilder.group({
    pedidoId: null,
    produto: "",
    quantidade: 0,
    corEtiqueta: "",
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

  public readonly serviceApi = `${environment.baseUrl}/pedidos-items`
  public pedidoIdService = `${environment.baseUrl}/pedidos/select`

  subscriptions = new Subscription()

  public readonly pageActions: Array<PoPageAction> = []

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
      this.subscriptions.add(this.getPedidoItem(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: "edit", module: "operacao", options: "pedidoItem" }).subscribe({
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
        action: () => this.save(this.pedidoItemForm.value),
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.pedidoItemForm.value, true),
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getPedidoItem(id: string) {
    this.restService.get(`/pedidos-items/${id}`).subscribe({
      next: (result) => {
        this.pedidoItemForm.patchValue({
          pedidoId: result.pedidoId,
          produto: result.produto,
          quantidade: result.quantidade,
          corEtiqueta: result.corEtiqueta,
        })
      },
      error: (error) => console.log(error),
    })
  }

  save(data, willCreateAnother?: boolean) {
    if (this.pedidoItemForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === "edit") {
        this.subscriptions.add(
          this.restService.put(`/pedidos-items/${this.id}`, data).subscribe({
            next: () => {
              this.poNotification.success({
                message: this.literals.saveSuccess,
                duration: environment.poNotificationDuration,
              })

              if (willCreateAnother) {
                this.pedidoItemForm.reset()
                this.router.navigate(["pedidos-items/new"])
              } else {
                this.router.navigate(["pedidos-items"])
              }
            },
            error: (error) => console.log(error),
          })
        )
      } else {
        this.subscriptions.add(
          this.restService.post("/pedidos-items", data).subscribe({
            next: () => {
              this.poNotification.success({
                message: this.literals.saveSuccess,
                duration: environment.poNotificationDuration,
              })

              if (willCreateAnother) {
                this.pedidoItemForm.reset()
                this.router.navigate(["pedidos-items/new"])
              } else {
                this.router.navigate(["pedidos-items"])
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
    this.pedidoItemForm.controls.pedidoId.markAsDirty()
    this.pedidoItemForm.controls.produto.markAsDirty()
  }

  goBack() {
    this.router.navigate(["pedidos-items"])
  }

  estadoIdChange(event: string) {
    this.cidadeIdService = `${environment.baseUrl}/cidades/select?estadoId=${event}`
  }

  clienteIdChange(event: string) {
    this.restService.get(`/clientes/${event}`).subscribe({
      next: (result) => {
        console.log(result)
        this.pedidoItemForm.patchValue({
          telefone: result.telefone,
          // cep: result.cep,
          // endereco: result.endereco,
          // numero: result.numero,
          // complemento: result.complemento,
          // bairro: result.bairro,
          // estadoId: result.estadoId,
          // cidadeId: result.cidadeId,
        })
      },
      error: (error) => console.log(error),
    })
  }
}
