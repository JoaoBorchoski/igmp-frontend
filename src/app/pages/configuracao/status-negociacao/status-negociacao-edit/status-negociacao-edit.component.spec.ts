import { ComponentFixture, TestBed } from "@angular/core/testing"

import { StatusNegociacaoEditComponent } from "./status-negociacao-edit.component"

describe("StatusNegociacaoEditComponent", () => {
  let component: StatusNegociacaoEditComponent
  let fixture: ComponentFixture<StatusNegociacaoEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusNegociacaoEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusNegociacaoEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
