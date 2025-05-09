import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MettreAjourMachineComponent } from './mettre-ajour-machine.component';

describe('MettreAjourMachineComponent', () => {
  let component: MettreAjourMachineComponent;
  let fixture: ComponentFixture<MettreAjourMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MettreAjourMachineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MettreAjourMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
