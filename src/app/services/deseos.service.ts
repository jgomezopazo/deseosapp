import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  deseos: Lista[] = [];

  constructor() {

    this.cargarStorage();
    
   }

   crearLista(titulo: string) {
      const nuevaLista = new Lista(titulo);
      this.deseos.push(nuevaLista);
      this.guardarStorage();
   }

   guardarStorage() {
      localStorage.setItem('data', JSON.stringify(this.deseos));
   }

   cargarStorage() {
    if(localStorage.getItem('data')) {
     this.deseos = JSON.parse( localStorage.getItem('data') );
    }
  }

}
