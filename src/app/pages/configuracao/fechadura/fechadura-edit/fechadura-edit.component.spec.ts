import { ComponentFixture, TestBed } from "@angular/core/testing"

import { FechaduraEditComponent } from "./fechadura-edit.component"

describe("FechaduraEditComponent", () => {
  let component: FechaduraEditComponent
  let fixture: ComponentFixture<FechaduraEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FechaduraEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FechaduraEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
