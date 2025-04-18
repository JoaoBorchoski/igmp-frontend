import { ComponentFixture, TestBed } from "@angular/core/testing"

import { MedicaoEditComponent } from "./medicao-edit.component"

describe("MedicaoEditComponent", () => {
  let component: MedicaoEditComponent
  let fixture: ComponentFixture<MedicaoEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicaoEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicaoEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
