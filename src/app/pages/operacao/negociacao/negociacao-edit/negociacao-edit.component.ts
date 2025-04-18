import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "app-negociacao-edit",
  templateUrl: "./negociacao-edit.component.html",
  styleUrls: ["./negociacao-edit.component.scss"],
})
export class NegociacaoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any
  public literals: any = {}

  negociacaoForm = this.formBuilder.group({
    medicaoId: null,
    clienteId: null,
    statusNegociacaoId: null,
    funcionarioId: null,
    dataCriacao: null,
    dataFechamento: null,
    valorEstimado: null,
    descricao: '',
    motivoPerda: '',
  })

  public readonly serviceApi = `${environment.baseUrl}/negociacoes`
  public medicaoIdService = `${environment.baseUrl}/medicao/select`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public statusNegociacaoIdService = `${environment.baseUrl}/status-negociacao/select`
  public funcionarioIdService = `${environment.baseUrl}/funcionarios/select`
  public valorEstimadoService = `${environment.baseUrl}/2/select`

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
  ) { }

  ngOnInit(): void {
    this.getLiterals()

    this.id = this.activatedRoute.snapshot.paramMap.get("id")

    this.pageButtonsBuilder(this.getPageType(this.activatedRoute.snapshot.routeConfig.path))

    if (this.id) {
      this.subscriptions.add(this.getNegociacao(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'operacao', options: 'negociacao'})
      .subscribe({
        next: res => this.literals = res
      })
  }

  getPageType(route: string): string {
    switch (route) {
      case 'new':
        return 'new'
      case 'new/:id':
        return 'new'
      case 'edit':
        return 'edit'
      case 'edit/:id':
        return 'edit'
      case 'view/:id':
        return 'view'
    }
  }

  pageButtonsBuilder(pageType: string): null {
    if (pageType === 'view') {
      this.readonly = true

      this.pageActions.push(
        {
          label: this.literals.return,
          action: this.goBack.bind(this),
        }
      )
      return
    }

    this.pageActions.push(
      {
        label: this.literals.save,
        action: () => this.save(this.negociacaoForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.negociacaoForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getNegociacao(id: string) {
    this.restService
      .get(`/negociacoes/${id}`)
      .subscribe({
        next: (result) => {
          this.negociacaoForm.patchValue({
            medicaoId: result.medicaoId,
            clienteId: result.clienteId,
            statusNegociacaoId: result.statusNegociacaoId,
            funcionarioId: result.funcionarioId,
            dataCriacao: result.dataCriacao ? result.dataCriacao.substring(0, 10) : null,
            dataFechamento: result.dataFechamento ? result.dataFechamento.substring(0, 10) : null,
            valorEstimado: result.valorEstimado,
            descricao: result.descricao,
            motivoPerda: result.motivoPerda,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data, willCreateAnother?: boolean) {
    if (this.negociacaoForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/negociacoes/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.negociacaoForm.reset()
                  this.router.navigate(["negociacoes/new"])
                } else {
                  this.router.navigate(["negociacoes"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/negociacoes", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.negociacaoForm.reset()
                  this.router.navigate(["negociacoes/new"])
                } else {
                  this.router.navigate(["negociacoes"])
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
        duration: environment.poNotificationDuration
      })
    }
  }

  markAsDirty() {
    this.negociacaoForm.controls.medicaoId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["negociacoes"])
  }
}
