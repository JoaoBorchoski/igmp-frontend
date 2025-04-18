import { ComponentFixture, TestBed } from "@angular/core/testing"

import { PadraoCorListComponent } from "./padrao-cor-list.component"

describe("PadraoCorListComponent", () => {
  let component: PadraoCorListComponent
  let fixture: ComponentFixture<PadraoCorListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PadraoCorListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PadraoCorListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
