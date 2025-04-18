import { ComponentFixture, TestBed } from "@angular/core/testing"

import { AlturaVaosListComponent } from "./altura-vaos-list.component"

describe("AlturaVaosListComponent", () => {
  let component: AlturaVaosListComponent
  let fixture: ComponentFixture<AlturaVaosListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlturaVaosListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AlturaVaosListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
