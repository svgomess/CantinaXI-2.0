import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaprodutosPage } from './listaprodutos.page';

describe('ListaprodutosPage', () => {
  let component: ListaprodutosPage;
  let fixture: ComponentFixture<ListaprodutosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaprodutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
