import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterSaloonComponent } from './register-saloon.component';
describe('RegisterSaloonComponent', () => {
  let component: RegisterSaloonComponent;
  let fixture: ComponentFixture<RegisterSaloonComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSaloonComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterSaloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
