import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HairsaloonPageComponent } from './hairsaloon-page.component';

describe('HairsaloonPageComponent', () => {
  let component: HairsaloonPageComponent;
  let fixture: ComponentFixture<HairsaloonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HairsaloonPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HairsaloonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
