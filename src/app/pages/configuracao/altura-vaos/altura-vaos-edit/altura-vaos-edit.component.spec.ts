import { ComponentFixture, TestBed } from "@angular/core/testing"

import { AlturaVaosEditComponent } from "./altura-vaos-edit.component"

describe("AlturaVaosEditComponent", () => {
  let component: AlturaVaosEditComponent
  let fixture: ComponentFixture<AlturaVaosEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlturaVaosEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AlturaVaosEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
