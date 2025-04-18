import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/funcionario-list",
  templateUrl: ".//funcionario-list.component.html",
})
export class FuncionarioListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'configuracao', options: 'funcionario'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'nome', label: this.literals.fields.list['nome'] },
          { property: 'cpf', label: this.literals.fields.list['cpf'] },
          { property: 'email', label: this.literals.fields.list['email'] }
        ]
      })
  }

}
