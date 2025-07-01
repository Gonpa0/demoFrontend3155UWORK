import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Insertareditarvaloracion } from './insertareditarvaloracion';

describe('Insertareditarvaloracion', () => {
  let component: Insertareditarvaloracion;
  let fixture: ComponentFixture<Insertareditarvaloracion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Insertareditarvaloracion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Insertareditarvaloracion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
