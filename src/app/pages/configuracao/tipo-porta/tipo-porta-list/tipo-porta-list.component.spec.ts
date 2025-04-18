import { ComponentFixture, TestBed } from "@angular/core/testing"

import { TipoPortaListComponent } from "./tipo-porta-list.component"

describe("TipoPortaListComponent", () => {
  let component: TipoPortaListComponent
  let fixture: ComponentFixture<TipoPortaListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipoPortaListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPortaListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
