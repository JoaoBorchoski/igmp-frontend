import { ComponentFixture, TestBed } from "@angular/core/testing"

import { LarguraVaosEditComponent } from "./largura-vaos-edit.component"

describe("LarguraVaosEditComponent", () => {
  let component: LarguraVaosEditComponent
  let fixture: ComponentFixture<LarguraVaosEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LarguraVaosEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LarguraVaosEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
