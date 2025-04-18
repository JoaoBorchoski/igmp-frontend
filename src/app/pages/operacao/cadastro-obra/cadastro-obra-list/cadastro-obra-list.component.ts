import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/cadastro-obra-list",
  templateUrl: ".//cadastro-obra-list.component.html",
})
export class CadastroObraListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'operacao', options: 'cadastroObra'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'nome', label: this.literals.fields.list['nome'] },
          { property: 'cnpj', label: this.literals.fields.list['cnpj'] },
          { property: 'endereco', label: this.literals.fields.list['endereco'] },
          { property: 'responsavelObra', label: this.literals.fields.list['responsavelObra'] },
          { property: 'contato', label: this.literals.fields.list['contato'] },
          { property: 'tipoObra', label: this.literals.fields.list['tipoObra'] }
        ]
      })
  }

}
