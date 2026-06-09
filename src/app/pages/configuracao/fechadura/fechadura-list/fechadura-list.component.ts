import { Component, OnInit } from '@angular/core'
import { map } from 'rxjs/operators'
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
	selector: '/fechadura-list',
	templateUrl: './/fechadura-list.component.html',
})
export class FechaduraListComponent implements OnInit {
	public literals: any = {}

	public initialFields = []

	constructor(private languagesService: LanguagesService) {}

	ngOnInit() {
		this.getLiterals()
	}

	getLiterals() {
		this.languagesService
			.getLiterals({ type: 'list', module: 'configuracao', options: 'fechadura' })
			.pipe(map((res) => (this.literals = res)))
			.subscribe({
				next: () =>
					(this.initialFields = [
						{ property: 'id', key: true, visible: false },
						{ property: 'descricao', label: this.literals.fields.list['descricao'] },
						{ property: 'placa', label: this.literals.fields.list['placa'] },
						{ property: 'motorista', label: this.literals.fields.list['motorista'] },
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
					]),
			})
	}
}
