import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationOrdreComponent } from './affectation-ordre.component';

describe('AffectationOrdreComponent', () => {
  let component: AffectationOrdreComponent;
  let fixture: ComponentFixture<AffectationOrdreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffectationOrdreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectationOrdreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
