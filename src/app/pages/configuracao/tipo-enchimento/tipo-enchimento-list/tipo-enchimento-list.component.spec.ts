import { ComponentFixture, TestBed } from "@angular/core/testing"

import { TipoEnchimentoListComponent } from "./tipo-enchimento-list.component"

describe("TipoEnchimentoListComponent", () => {
  let component: TipoEnchimentoListComponent
  let fixture: ComponentFixture<TipoEnchimentoListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipoEnchimentoListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEnchimentoListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
