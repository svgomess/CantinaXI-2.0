import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoProdutoPage } from './info-produto.page';

describe('InfoProdutoPage', () => {
  let component: InfoProdutoPage;
  let fixture: ComponentFixture<InfoProdutoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoProdutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
