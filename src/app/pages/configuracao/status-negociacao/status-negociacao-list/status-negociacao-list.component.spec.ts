import { ComponentFixture, TestBed } from "@angular/core/testing"

import { StatusNegociacaoListComponent } from "./status-negociacao-list.component"

describe("StatusNegociacaoListComponent", () => {
  let component: StatusNegociacaoListComponent
  let fixture: ComponentFixture<StatusNegociacaoListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusNegociacaoListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusNegociacaoListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
