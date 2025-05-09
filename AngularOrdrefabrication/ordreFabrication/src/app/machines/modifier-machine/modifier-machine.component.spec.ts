import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMachineComponent } from './modifier-machine.component';

describe('ModifierMachineComponent', () => {
  let component: ModifierMachineComponent;
  let fixture: ComponentFixture<ModifierMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierMachineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
