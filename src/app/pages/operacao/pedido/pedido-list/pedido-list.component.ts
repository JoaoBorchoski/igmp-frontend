import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/pedido-list",
  templateUrl: ".//pedido-list.component.html",
})
export class PedidoListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'operacao', options: 'pedido'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'cliente', label: this.literals.fields.list['cliente'] },
          { property: 'estadoUf', label: this.literals.fields.list['estadoUf'] },
        ]
      })
  }

}
