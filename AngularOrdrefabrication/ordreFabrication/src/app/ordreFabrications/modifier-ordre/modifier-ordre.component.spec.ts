import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierOrdreComponent } from './modifier-ordre.component';

describe('ModifierOrdreComponent', () => {
  let component: ModifierOrdreComponent;
  let fixture: ComponentFixture<ModifierOrdreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierOrdreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierOrdreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
