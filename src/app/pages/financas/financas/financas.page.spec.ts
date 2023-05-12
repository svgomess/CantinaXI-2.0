import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinancasPage } from './financas.page';

describe('FinancasPage', () => {
  let component: FinancasPage;
  let fixture: ComponentFixture<FinancasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FinancasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
