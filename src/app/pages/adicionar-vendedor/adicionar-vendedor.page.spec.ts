import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarVendedorPage } from './adicionar-vendedor.page';

describe('AdicionarVendedorPage', () => {
  let component: AdicionarVendedorPage;
  let fixture: ComponentFixture<AdicionarVendedorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdicionarVendedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
