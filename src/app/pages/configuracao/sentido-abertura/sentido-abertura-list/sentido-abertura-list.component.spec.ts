import { ComponentFixture, TestBed } from "@angular/core/testing"

import { SentidoAberturaListComponent } from "./sentido-abertura-list.component"

describe("SentidoAberturaListComponent", () => {
  let component: SentidoAberturaListComponent
  let fixture: ComponentFixture<SentidoAberturaListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SentidoAberturaListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SentidoAberturaListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
