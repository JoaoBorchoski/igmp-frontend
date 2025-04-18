import { ComponentFixture, TestBed } from "@angular/core/testing"

import { LarguraVaosListComponent } from "./largura-vaos-list.component"

describe("LarguraVaosListComponent", () => {
  let component: LarguraVaosListComponent
  let fixture: ComponentFixture<LarguraVaosListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LarguraVaosListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LarguraVaosListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
