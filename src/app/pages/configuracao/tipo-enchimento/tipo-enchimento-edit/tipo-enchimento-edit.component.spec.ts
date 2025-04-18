import { ComponentFixture, TestBed } from "@angular/core/testing"

import { TipoEnchimentoEditComponent } from "./tipo-enchimento-edit.component"

describe("TipoEnchimentoEditComponent", () => {
  let component: TipoEnchimentoEditComponent
  let fixture: ComponentFixture<TipoEnchimentoEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipoEnchimentoEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEnchimentoEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
