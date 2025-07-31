import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestigingOverzicht } from './vestiging-overzicht';

describe('VestigingOverzicht', () => {
  let component: VestigingOverzicht;
  let fixture: ComponentFixture<VestigingOverzicht>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VestigingOverzicht]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VestigingOverzicht);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
