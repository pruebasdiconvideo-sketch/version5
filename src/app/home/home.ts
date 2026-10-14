import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Categorias } from '../categorias/categorias';
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Projects } from '../projects/projects';
import { Skills } from '../skills/skills';
import { Testimonios } from '../testimonios/testimonios';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Categorias, Hero, About, Projects, Skills, Testimonios],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
