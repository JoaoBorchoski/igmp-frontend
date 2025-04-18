import { ComponentFixture, TestBed } from "@angular/core/testing"

import { CadastroObraListComponent } from "./cadastro-obra-list.component"

describe("CadastroObraListComponent", () => {
  let component: CadastroObraListComponent
  let fixture: ComponentFixture<CadastroObraListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroObraListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroObraListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
