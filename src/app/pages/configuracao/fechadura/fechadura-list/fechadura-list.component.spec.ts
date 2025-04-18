import { ComponentFixture, TestBed } from "@angular/core/testing"

import { FechaduraListComponent } from "./fechadura-list.component"

describe("FechaduraListComponent", () => {
  let component: FechaduraListComponent
  let fixture: ComponentFixture<FechaduraListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FechaduraListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FechaduraListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
