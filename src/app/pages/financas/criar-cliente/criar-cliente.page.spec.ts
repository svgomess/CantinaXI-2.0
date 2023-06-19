import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarClientePage } from './criar-cliente.page';

describe('CriarClientePage', () => {
  let component: CriarClientePage;
  let fixture: ComponentFixture<CriarClientePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CriarClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
