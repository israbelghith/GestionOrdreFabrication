import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterOrdreComponent } from './ajouter-ordre.component';

describe('AjouterOrdreComponent', () => {
  let component: AjouterOrdreComponent;
  let fixture: ComponentFixture<AjouterOrdreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterOrdreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterOrdreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
