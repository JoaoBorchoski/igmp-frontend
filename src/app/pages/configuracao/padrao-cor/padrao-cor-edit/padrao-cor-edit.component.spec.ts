import { ComponentFixture, TestBed } from "@angular/core/testing"

import { PadraoCorEditComponent } from "./padrao-cor-edit.component"

describe("PadraoCorEditComponent", () => {
  let component: PadraoCorEditComponent
  let fixture: ComponentFixture<PadraoCorEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PadraoCorEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PadraoCorEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
