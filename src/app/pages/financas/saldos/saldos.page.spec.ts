import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaldosPage } from './saldos.page';

describe('SaldosPage', () => {
  let component: SaldosPage;
  let fixture: ComponentFixture<SaldosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SaldosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
