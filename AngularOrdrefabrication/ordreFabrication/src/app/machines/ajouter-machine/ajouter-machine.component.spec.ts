import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterMachineComponent } from './ajouter-machine.component';

describe('AjouterMachineComponent', () => {
  let component: AjouterMachineComponent;
  let fixture: ComponentFixture<AjouterMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterMachineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
