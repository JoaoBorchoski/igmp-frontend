import { ComponentFixture, TestBed } from "@angular/core/testing"

import { AlizarEditComponent } from "./alizar-edit.component"

describe("AlizarEditComponent", () => {
  let component: AlizarEditComponent
  let fixture: ComponentFixture<AlizarEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlizarEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AlizarEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
