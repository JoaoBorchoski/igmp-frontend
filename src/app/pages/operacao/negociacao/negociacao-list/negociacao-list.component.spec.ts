import { ComponentFixture, TestBed } from "@angular/core/testing"

import { NegociacaoListComponent } from "./negociacao-list.component"

describe("NegociacaoListComponent", () => {
  let component: NegociacaoListComponent
  let fixture: ComponentFixture<NegociacaoListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NegociacaoListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NegociacaoListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
