import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('abre y cierra el menú responsivo', () => {
    const boton = fixture.nativeElement.querySelector('button.navbar-toggler') as HTMLButtonElement;
    const menu = fixture.nativeElement.querySelector('#menu-principal') as HTMLElement;

    boton.click();
    fixture.detectChanges();
    expect(menu.classList.contains('show')).toBeTrue();
    expect(boton.getAttribute('aria-expanded')).toBe('true');

    boton.click();
    fixture.detectChanges();
    expect(menu.classList.contains('show')).toBeFalse();
    expect(boton.getAttribute('aria-expanded')).toBe('false');
  });
});
