import { ComponentFixture, TestBed } from "@angular/core/testing"

import { TipoPortaEditComponent } from "./tipo-porta-edit.component"

describe("TipoPortaEditComponent", () => {
  let component: TipoPortaEditComponent
  let fixture: ComponentFixture<TipoPortaEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipoPortaEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPortaEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
