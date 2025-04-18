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
  selector: "app-medicao-edit",
  templateUrl: "./medicao-edit.component.html",
  styleUrls: ["./medicao-edit.component.scss"],
})
export class MedicaoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any
  public literals: any = {}

  medicaoForm = this.formBuilder.group({
    cadastroObraId: null,
    complemento: "",
    espessuraParede: "",
    larguraVaosId: null,
    alturaVaosId: null,
    tipoEnchimentoId: null,
    tipoPortaId: null,
    confirmacao: false,
    complementoOrigemId: null,
    sentidoAberturaId: null,
    alizarId: null,
    fechaduraId: null,
  })

  public readonly serviceApi = `${environment.baseUrl}/medicoes`
  public obraIdService = `${environment.baseUrl}/cadastro-obras/select`
  public larguraVaosIdService = `${environment.baseUrl}/largura-vaos/select`
  public alturaVaosIdService = `${environment.baseUrl}/altura-vaos/select`
  public tipoEnchimentoIdService = `${environment.baseUrl}/tipo-enchimento/select`
  public tipoPortaIdService = `${environment.baseUrl}/tipo-porta/select`
  public complementoOrigemIdService = `${environment.baseUrl}/complemento-origem/select`
  public sentidoAberturaIdService = `${environment.baseUrl}/sentido-abertura/select`
  public alizarIdService = `${environment.baseUrl}/alizar/select`
  public fechaduraIdService = `${environment.baseUrl}/fechadura/select`

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
      this.subscriptions.add(this.getMedicao(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: "edit", module: "operacao", options: "medicao" }).subscribe({
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
        action: () => this.save(this.medicaoForm.value),
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.medicaoForm.value, true),
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getMedicao(id: string) {
    this.restService.get(`/medicoes/${id}`).subscribe({
      next: (result) => {
        this.medicaoForm.patchValue({
          cadastroObraId: result.obraId,
          complemento: result.complemento,
          espessuraParede: result.espessuraParede,
          larguraVaosId: result.larguraVaosId,
          alturaVaosId: result.alturaVaosId,
          tipoEnchimentoId: result.tipoEnchimentoId,
          tipoPortaId: result.tipoPortaId,
          confirmacao: result.confirmacao,
          complementoOrigemId: result.complementoOrigemId,
          sentidoAberturaId: result.sentidoAberturaId,
          alizarId: result.alizarId,
          fechaduraId: result.fechaduraId,
        })
      },
      error: (error) => console.log(error),
    })
  }

  save(data, willCreateAnother?: boolean) {
    if (this.medicaoForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === "edit") {
        this.subscriptions.add(
          this.restService.put(`/medicoes/${this.id}`, data).subscribe({
            next: () => {
              this.poNotification.success({
                message: this.literals.saveSuccess,
                duration: environment.poNotificationDuration,
              })

              if (willCreateAnother) {
                this.medicaoForm.reset()
                this.router.navigate(["medicoes/new"])
              } else {
                this.router.navigate(["medicoes"])
              }
            },
            error: (error) => console.log(error),
          })
        )
      } else {
        this.subscriptions.add(
          this.restService.post("/medicoes", data).subscribe({
            next: () => {
              this.poNotification.success({
                message: this.literals.saveSuccess,
                duration: environment.poNotificationDuration,
              })

              if (willCreateAnother) {
                this.medicaoForm.reset()
                this.router.navigate(["medicoes/new"])
              } else {
                this.router.navigate(["medicoes"])
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
    this.medicaoForm.controls.cadastroObraId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["medicoes"])
  }
}
