import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification, PoLookupColumn, PoTableAction } from '@po-ui/ng-components'
import { FormArray, FormBuilder } from '@angular/forms'
import { Subscription, forkJoin } from 'rxjs'
import { environment } from 'src/environments/environment'
import { RestService } from 'src/app/services/rest.service'
import { LanguagesService } from 'src/app/services/languages.service'
import { ExcelService } from 'src/app/services/excel.service'

@Component({
	selector: 'app-fechadura-edit',
	templateUrl: './fechadura-edit.component.html',
	styleUrls: ['./fechadura-edit.component.scss'],
})
export class FechaduraEditComponent implements OnInit, OnDestroy {
	public id: string
	public readonly = false
	public result: any
	public literals: any = {}
	public editMode = false

	public readonly serviceApi = `${environment.baseUrl}/espelhos-carga`
	public pedidoIdService = `${environment.baseUrl}/pedidos/select`
	public pedidoPacotesIdService = `${environment.baseUrl}/pacotes/select-pacotes-interno`
	public produtoIdService = `${environment.baseUrl}/produtos/select`

	columnsFornecedor: Array<PoLookupColumn> = [{ property: 'label', label: 'Pedido' }]

	tipoPortaForm = this.formBuilder.group({
		pedidoId: '',
		pacoteId: [],
		placa: '',
		motorista: '',
		lote: '',
		descricao: '',
		espelhoCargaItems: this.formBuilder.array([]),
	})

	public readonly columnsTableItems = [
		{ property: 'id', key: true, visible: false },
		{ property: 'descricao', label: 'Descrição' },
		{
			property: 'confirmado',
			label: 'Carregado',
			width: '10%',
			type: 'subtitle',
			subtitles: [
				{
					value: true,
					color: 'color-10',
					label: 'Sim',
					content: 'S',
				},
				{
					value: false,
					color: 'color-07',
					label: 'Não',
					content: 'N',
				},
			],
		},
		{
			property: 'descarregado',
			label: 'Descarregado',
			width: '10%',
			type: 'subtitle',
			subtitles: [
				{ value: true, color: 'color-10', label: 'Sim', content: 'S' },
				{ value: false, color: 'color-07', label: 'Não', content: 'N' },
			],
		},
	]

	public readonly columnsTablePacoteItems = [
		{ property: 'id', key: true, visible: false },
		{ property: 'produto_nome', label: 'Produto' },
		{ property: 'quantidade', label: 'Quantidade', type: 'number' },
	]

	public tableActions: PoTableAction[] = [
		{
			label: '',
			action: this.removeItemTable.bind(this),
			icon: 'fa-solid fa-trash',
			disabled: (rowItem: any) => rowItem.confirmado === true,
		},
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

		this.id = this.activatedRoute.snapshot.paramMap.get('id')

		this.pageButtonsBuilder(this.getPageType(this.activatedRoute.snapshot.routeConfig.path))

		if (this.id) {
			this.subscriptions.add(this.getTipoPorta(this.id))
			this.editMode = true
		}
	}

	// ngAfterViewInit(): void {
	// 	this.tableActions[0].disabled = this.editMode
	// }

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}

	getLiterals() {
		this.languagesService.getLiterals({ type: 'edit', module: 'configuracao', options: 'tipoPorta' }).subscribe({
			next: (res) => (this.literals = res),
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

			this.pageActions.push({
				label: this.literals.return,
				action: this.goBack.bind(this),
			})
			return
		}

		this.pageActions.push(
			{
				label: this.literals.save,
				action: () => this.save(this.tipoPortaForm.value),
			},
			{
				label: this.literals.saveAndNew,
				action: () => this.save(this.tipoPortaForm.value, true),
			},
			{
				label: this.literals.cancel,
				action: this.goBack.bind(this),
			}
		)

		return
	}

	getTipoPorta(id: string) {
		this.restService.get(`/espelhos-carga/${id}`).subscribe({
			next: (result) => {
				const espelhoCargaItems = this.tipoPortaForm.get('espelhoCargaItems') as FormArray
				espelhoCargaItems.clear()

				result.espelhoCargaItems?.forEach((pacote: any) => {
					espelhoCargaItems.push(
						this.formBuilder.group({
							id: pacote.id,
							descricao: pacote.descricao,
							confirmado: pacote.confirmado,
							descarregado: pacote.descarregado,
							items: this.formBuilder.array(
								pacote.items.map((item: any) =>
									this.formBuilder.group({
										id: item.id,
										produto: item.produto,
										produto_nome: item.produto_nome,
										quantidade: item.quantidade,
									})
								)
							),
						})
					)
				})

				this.tipoPortaForm.patchValue({
					pedidoId: result.pedidoId,
					placa: result.placa,
					motorista: result.motorista,
					lote: result.lote,
					descricao: result.descricao,
				})
			},
			error: (error) => console.log(error),
		})
	}

	save(data, willCreateAnother?: boolean) {
		console.log(data)

		if (this.tipoPortaForm.valid) {
			if (this.tipoPortaForm.get('espelhoCargaItems').value.length === 0) {
				this.poNotification.warning({
					message: 'Nenhum pacote selecionado',
					duration: environment.poNotificationDuration,
				})
				return
			}
			if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
				this.subscriptions.add(
					this.restService.put(`/espelhos-carga-interno/${this.id}`, data).subscribe({
						next: () => {
							this.poNotification.success({
								message: this.literals.saveSuccess,
								duration: environment.poNotificationDuration,
							})

							if (willCreateAnother) {
								this.tipoPortaForm.reset()
								this.router.navigate(['espelhos-carga-interno/new'])
							} else {
								this.router.navigate(['espelhos-carga-interno'])
							}
						},
						error: (error) => console.log(error),
					})
				)
			} else {
				this.subscriptions.add(
					this.restService.post('/espelhos-carga-interno', data).subscribe({
						next: () => {
							this.poNotification.success({
								message: this.literals.saveSuccess,
								duration: environment.poNotificationDuration,
							})

							if (willCreateAnother) {
								this.tipoPortaForm.reset()
								this.router.navigate(['espelhos-carga-interno/new'])
							} else {
								this.router.navigate(['espelhos-carga-interno'])
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
		this.tipoPortaForm.controls.pedidoId.markAsDirty()
		this.tipoPortaForm.controls.placa.markAsDirty()
		this.tipoPortaForm.controls.motorista.markAsDirty()
		this.tipoPortaForm.controls.lote.markAsDirty()
		this.tipoPortaForm.controls.descricao.markAsDirty()
	}

	goBack() {
		this.router.navigate(['tipos-porta'])
	}

	adicionarPacotes() {
		const pacoteIds = this.tipoPortaForm.get('pacoteId').value

		if (!pacoteIds || pacoteIds.length === 0) {
			console.log('Nenhum pacote selecionado')
			return
		}

		const requests = pacoteIds.map((pacote: any) => this.restService.get(`/pacotes/${pacote}`))

		forkJoin(requests).subscribe({
			next: (pacotes) => {
				const espelhoCargaItems = this.tipoPortaForm.get('espelhoCargaItems') as FormArray
				pacotes.forEach((pacote: any) => {
					if (espelhoCargaItems.value.some((item: any) => item.id === pacote.id)) {
						return
					} else {
						espelhoCargaItems.push(
							this.formBuilder.group({
								id: pacote.id,
								descricao: pacote.descricao,
								confirmado: false,
								items: this.formBuilder.array(this.getPacoteItems(pacote)),
							})
						)
					}
				})
				this.tipoPortaForm.patchValue({
					pedidoId: null,
					pacoteId: [],
				})
			},
			error: (error) => console.log(error),
		})
	}

	getPacoteItems(pacote) {
		return pacote.items.map((item: any) => {
			return this.formBuilder.group({
				id: item.id,
				produto: item.produto,
				produto_nome: item.produto_nome,
				quantidade: item.quantidade,
			})
		})
	}

	hasItems = (rowItem: any): boolean => {
		const espelhoCargaItems = this.tipoPortaForm.get('espelhoCargaItems') as FormArray
		const pacoteIndex = espelhoCargaItems.value.findIndex((item: any) => item.id === rowItem.id)
		if (pacoteIndex === -1) return false

		const pacoteFormGroup = espelhoCargaItems.at(pacoteIndex)
		const items = pacoteFormGroup.get('items') as FormArray
		return items && items.length > 0
	}

	getPacoteItemsArray = (rowItem: any): any[] => {
		const espelhoCargaItems = this.tipoPortaForm.get('espelhoCargaItems') as FormArray
		const pacoteIndex = espelhoCargaItems.value.findIndex((item: any) => item.id === rowItem.id)
		if (pacoteIndex === -1) return []

		const pacoteFormGroup = espelhoCargaItems.at(pacoteIndex)
		const items = pacoteFormGroup.get('items') as FormArray
		return items ? items.value : []
	}

	removeItemTable(rowItem: any) {
		const espelhoCargaItems = this.tipoPortaForm.get('espelhoCargaItems') as FormArray
		const index = espelhoCargaItems.value.findIndex((item: any) => item.id === rowItem.id)
		if (index > -1) {
			espelhoCargaItems.removeAt(index)
		}
	}

	exportarEspelhoCarga() {
		this.restService.get(`/espelhos-carga/export/${this.id}`).subscribe({
			next: (result) => {
				this.excelService.createDownloadPdf(
					result,
					`registro-embarque-${new Date().toLocaleTimeString('pt-BR', {
						hour: '2-digit',
						minute: '2-digit',
					})}-${new Date().toLocaleDateString('pt-BR', {
						year: 'numeric',
						month: '2-digit',
						day: '2-digit',
					})}`
				)
			},
			error: (error) => console.log(error),
		})
	}
}
