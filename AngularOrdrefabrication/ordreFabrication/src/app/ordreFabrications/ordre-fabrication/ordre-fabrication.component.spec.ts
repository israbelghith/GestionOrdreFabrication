import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreFabricationComponent } from './ordre-fabrication.component';

describe('OrdreFabricationComponent', () => {
  let component: OrdreFabricationComponent;
  let fixture: ComponentFixture<OrdreFabricationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdreFabricationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdreFabricationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
