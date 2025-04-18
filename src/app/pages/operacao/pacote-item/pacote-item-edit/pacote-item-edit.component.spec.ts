import { ComponentFixture, TestBed } from "@angular/core/testing"

import { PacoteItemEditComponent } from "./pacote-item-edit.component"

describe("PacoteItemEditComponent", () => {
  let component: PacoteItemEditComponent
  let fixture: ComponentFixture<PacoteItemEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PacoteItemEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PacoteItemEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
