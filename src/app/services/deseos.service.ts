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

      return nuevaLista.id;
   }

   obtenerLista(id: string | number) {
      id = Number(id);

      return this.deseos.find( ( listaData ) => (listaData.id === id) );
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
