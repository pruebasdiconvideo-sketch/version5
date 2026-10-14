import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Testimonios } from './testimonios';

describe('Testimonios', () => {
  let component: Testimonios;
  let fixture: ComponentFixture<Testimonios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonios],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Testimonios);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renderiza todas las opiniones', () => {
    const figuras = (fixture.nativeElement as HTMLElement).querySelectorAll('figure');
    expect(figuras.length).toBe(component.opiniones.length);
  });
});
