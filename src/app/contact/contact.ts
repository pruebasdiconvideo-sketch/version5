import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, NgClass, NgIf],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  mensaje = { nombre: '', email: '', texto: '' };
  enviado = false;
  nombreEnviado = '';

  enviar(form: NgForm): void {
    if (form.invalid) return;
    this.nombreEnviado = this.mensaje.nombre;
    this.enviado = true;
    form.resetForm();
  }
}