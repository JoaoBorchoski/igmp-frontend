import { ComponentFixture, TestBed } from "@angular/core/testing"

import { CadastroObraEditComponent } from "./cadastro-obra-edit.component"

describe("CadastroObraEditComponent", () => {
  let component: CadastroObraEditComponent
  let fixture: ComponentFixture<CadastroObraEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroObraEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroObraEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
