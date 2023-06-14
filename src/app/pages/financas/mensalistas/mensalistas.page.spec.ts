import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MensalistasPage } from './mensalistas.page';

describe('MensalistasPage', () => {
  let component: MensalistasPage;
  let fixture: ComponentFixture<MensalistasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MensalistasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
