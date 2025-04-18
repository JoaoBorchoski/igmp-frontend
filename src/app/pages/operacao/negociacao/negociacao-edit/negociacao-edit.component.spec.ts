import { ComponentFixture, TestBed } from "@angular/core/testing"

import { NegociacaoEditComponent } from "./negociacao-edit.component"

describe("NegociacaoEditComponent", () => {
  let component: NegociacaoEditComponent
  let fixture: ComponentFixture<NegociacaoEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NegociacaoEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NegociacaoEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
