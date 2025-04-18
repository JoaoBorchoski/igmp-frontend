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
  selector: "app-cadastro-obra-edit",
  templateUrl: "./cadastro-obra-edit.component.html",
  styleUrls: ["./cadastro-obra-edit.component.scss"],
})
export class CadastroObraEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any
  public literals: any = {}

  cadastroObraForm = this.formBuilder.group({
    nome: "",
    cliente: null,
    cnpj: "",
    endereco: "",
    responsavelObra: "",
    contato: "",
    previsaoEntrega: null,
    tipoObra: "",
    plantasIguais: false,
    qtdCasas: null,
    grupoCasas: "",
    estruturaPredio: "",
    qtdAptoPorAndar: null,
    andares: null,
    qtdAptos: null,
    grupoAndares: "",
    padraoCorId: null,
    solidaMadeirada: "",
    coresTiposId: null,
  })

  public readonly plantasIguaisOptions = [
    { label: "Sim", value: true },
    { label: "Não", value: false },
  ]

  public readonly estruturaPredioOptions = [
    { label: "Torre", value: "Torre" },
    { label: "Bloco", value: "Bloco" },
  ]

  public readonly tipoObraOptions = [
    { label: "Casa", value: "Casa" },
    { label: "Prédio", value: "Prédio" },
  ]

  public readonly solidaMadeiradaOptions = [
    { label: "Sólida", value: "Sólida" },
    { label: "Madeirada", value: "Madeirada" },
  ]

  public readonly serviceApi = `${environment.baseUrl}/cadastro-obras`
  public padraoCorIdService = `${environment.baseUrl}/padroes-cores/select`
  public coresTiposIdService = `${environment.baseUrl}/cores-tipos/select`
  public clienteIdService = `${environment.baseUrl}/clientes/select`

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
      this.subscriptions.add(this.getCadastroObra(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: "edit", module: "operacao", options: "cadastroObra" }).subscribe({
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
        action: () => this.save(this.cadastroObraForm.value),
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.cadastroObraForm.value, true),
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getCadastroObra(id: string) {
    this.restService.get(`/cadastro-obras/${id}`).subscribe({
      next: (result) => {
        this.cadastroObraForm.patchValue({
          nome: result.nome,
          cliente: result.cliente,
          cnpj: result.cnpj,
          endereco: result.endereco,
          responsavelObra: result.responsavelObra,
          contato: result.contato,
          previsaoEntrega: result.previsaoEntrega ? result.previsaoEntrega.substring(0, 10) : null,
          tipoObra: result.tipoObra,
          plantasIguais: result.plantasIguais,
          qtdCasas: result.qtdCasas,
          grupoCasas: result.grupoCasas,
          estruturaPredio: result.estruturaPredio,
          qtdAptoPorAndar: result.qtdAptoPorAndar,
          andares: result.andares,
          qtdAptos: result.qtdAptos,
          grupoAndares: result.grupoAndares,
          padraoCorId: result.padraoCorId,
          solidaMadeirada: result.solidaMadeirada,
        })
      },
      error: (error) => console.log(error),
    })
  }

  save(data, willCreateAnother?: boolean) {
    console.log(this.cadastroObraForm.controls)
    console.log(this.cadastroObraForm.errors)
    console.log(this.cadastroObraForm.valid)

    if (this.cadastroObraForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === "edit") {
        this.subscriptions.add(
          this.restService.put(`/cadastro-obras/${this.id}`, data).subscribe({
            next: () => {
              this.poNotification.success({
                message: this.literals.saveSuccess,
                duration: environment.poNotificationDuration,
              })

              if (willCreateAnother) {
                this.cadastroObraForm.reset()
                this.router.navigate(["cadastro-obras/new"])
              } else {
                this.router.navigate(["cadastro-obras"])
              }
            },
            error: (error) => console.log(error),
          })
        )
      } else {
        this.subscriptions.add(
          this.restService.post("/cadastro-obras", data).subscribe({
            next: () => {
              this.poNotification.success({
                message: this.literals.saveSuccess,
                duration: environment.poNotificationDuration,
              })

              if (willCreateAnother) {
                this.cadastroObraForm.reset()
                this.router.navigate(["cadastro-obras/new"])
              } else {
                this.router.navigate(["cadastro-obras"])
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
    this.cadastroObraForm.controls.nome.markAsDirty()
    this.cadastroObraForm.controls.cnpj.markAsDirty()
    this.cadastroObraForm.controls.endereco.markAsDirty()
    this.cadastroObraForm.controls.responsavelObra.markAsDirty()
    this.cadastroObraForm.controls.contato.markAsDirty()
    this.cadastroObraForm.controls.tipoObra.markAsDirty()
  }

  goBack() {
    this.router.navigate(["cadastro-obras"])
  }

  onChangeCliente(event) {
    this.restService.get(`/clientes/${event}`).subscribe({
      next: (result) => {
        this.cadastroObraForm.patchValue({
          cnpj: result.cpf,
          contato: result.telefone,
        })
      },
    })
  }
}
