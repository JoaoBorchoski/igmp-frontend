import { ComponentFixture, TestBed } from "@angular/core/testing"

import { MedicaoListComponent } from "./medicao-list.component"

describe("MedicaoListComponent", () => {
  let component: MedicaoListComponent
  let fixture: ComponentFixture<MedicaoListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicaoListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicaoListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
