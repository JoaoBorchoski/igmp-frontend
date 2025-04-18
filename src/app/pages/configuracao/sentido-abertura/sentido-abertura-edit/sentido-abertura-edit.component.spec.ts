import { ComponentFixture, TestBed } from "@angular/core/testing"

import { SentidoAberturaEditComponent } from "./sentido-abertura-edit.component"

describe("SentidoAberturaEditComponent", () => {
  let component: SentidoAberturaEditComponent
  let fixture: ComponentFixture<SentidoAberturaEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SentidoAberturaEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SentidoAberturaEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
