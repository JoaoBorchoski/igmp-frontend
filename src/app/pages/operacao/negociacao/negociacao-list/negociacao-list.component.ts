import { HttpClient } from "@angular/common/http"
import { Component, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { PoDialogService, PoNotificationService, PoPageAction, PoPageFilter } from "@po-ui/ng-components"
import { Subscription } from "rxjs"
import { finalize, map } from "rxjs/operators"
import { FilterModalComponent } from "src/app/components/filter-modal/filter-modal.component"
import { AuthService } from "src/app/services/auth.service"
import { LanguagesService } from 'src/app/services/languages.service'
import { PermService } from "src/app/services/perm.service"
import { RestService } from "src/app/services/rest.service"
import { environment } from "src/environments/environment"

interface ListResponse {
  items: any[]
  hasNext: boolean
}

interface INegociacao {
  id: string;
  descricao: string;
  status: string;
  dataCriacao: string;
  valorEstimado: number;
  clienteId: string;
  clienteNome: string;
}

@Component({
  selector: "/negociacao-list",
  templateUrl: ".//negociacao-list.component.html",
})
export class NegociacaoListComponent implements OnInit {
  @ViewChild(FilterModalComponent, { static: true }) filterModal: FilterModalComponent

  public literals: any = {}

  public initialFields = []

  public pageActions: PoPageAction[] = []
  public listLiterals: any = {}
  public filterSettings: PoPageFilter = {
    action: this.search.bind(this),
    placeholder: '',
    width: 4
  }
  private filter: string = ''
  private page: number = 1
  private subscriptions = new Subscription()
  public readonly serviceApi = `${environment.baseUrl}/negociacoes`
  public pageSize: number = 50
  public items: any[] = []
  public filterExpression: string
  public initialLoading: boolean = false
  public loading: boolean = false
  public filterSelected: string
  public filterItems: string[] = []

  public tableHeaders: string[] = ['Novo', 'Em andamento', 'Aguardando', 'Concluído'];
  public columns: string[] = ['0', '1', '2', '3'];
  public negociacoes: INegociacao[] = []
  public negociacaoSelecionada: INegociacao = null

  public isModalVisible = false;

  constructor(private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private httpClient: HttpClient,
    private permService: PermService,
    private poDialogService: PoDialogService,
    private poNotificationService: PoNotificationService,
    private restService: RestService,
    private languagesService: LanguagesService,
    private router: Router) { }

  ngOnInit() {
    this.getLiterals()
    this.getNegociacoes()
  }

  getNegociacoes() {
    this.httpClient.post(`${environment.baseUrl}/negociacoes/list`, { page: 1, pageSize: this.pageSize, search: '', filter: '' }).subscribe((res: any) => {
      console.log(res)
      this.negociacoes = res.items
    })
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'operacao', options: 'negociacao' })
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
        ]
      })
  }

  search(search?: string) {
    this.filter = search
    this.page = 1
    this.loading = true
    this.subscriptions.add(
      this.httpClient
        .post(`${environment.baseUrl}/negociacoes/list`, { page: 1, pageSize: this.pageSize, search, filter: this.filterExpression })
        .pipe(finalize(() => {
          this.loading = false
        }))
        .subscribe({
          next: (response: ListResponse) => this.items = response.items,
          error: () => this.items = []
        })
    )
  }

  changeFilter(filterId: string) {
    const filter = this.filterModal.savedFilter.savedFilters.find(savedFilter => savedFilter.value === filterId)
    this.submitFilter(filter.expression)
  }

  submitFilter(expression: string) {
    this.filterExpression = expression === '' ? null : expression
    this.search()
  }

  filterByStatus(status: number): INegociacao[] {
    return this.negociacoes.filter(negociacao => negociacao.status === status.toString());
  }

  onCardClick(negociacao: INegociacao): void {
    this.negociacaoSelecionada = negociacao
    this.openModal()
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.negociacaoSelecionada = null
    this.isModalVisible = false;
  }

}
