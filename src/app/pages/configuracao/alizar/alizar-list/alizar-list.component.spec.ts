import { ComponentFixture, TestBed } from "@angular/core/testing"

import { AlizarListComponent } from "./alizar-list.component"

describe("AlizarListComponent", () => {
  let component: AlizarListComponent
  let fixture: ComponentFixture<AlizarListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlizarListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AlizarListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
