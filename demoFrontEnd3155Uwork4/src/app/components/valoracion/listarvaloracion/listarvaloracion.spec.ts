import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listarvaloracion } from './listarvaloracion';

describe('Listarvaloracion', () => {
  let component: Listarvaloracion;
  let fixture: ComponentFixture<Listarvaloracion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listarvaloracion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listarvaloracion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
