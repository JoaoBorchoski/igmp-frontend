import { ComponentFixture, TestBed } from "@angular/core/testing"

import { PacoteItemListComponent } from "./pacote-item-list.component"

describe("PacoteItemListComponent", () => {
  let component: PacoteItemListComponent
  let fixture: ComponentFixture<PacoteItemListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PacoteItemListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PacoteItemListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
