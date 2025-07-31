import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestigingDetail } from './vestiging-detail';

describe('VestigingDetail', () => {
  let component: VestigingDetail;
  let fixture: ComponentFixture<VestigingDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VestigingDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VestigingDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
