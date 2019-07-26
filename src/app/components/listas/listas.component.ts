import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;
  @ViewChild('listaItem') listaItem: IonList; 

  constructor(public deseosService:DeseosService,
              private router:Router,
              private alertController:AlertController) { }

  listaSeleccionada(lista: Lista) {
    console.log({ lista });
    console.log(this.terminada);
    if(this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
    
  }

  borrarLista(lista:Lista) {
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista: Lista){
 
    const alert = await this.alertController.create({
      header: 'Editar Titulo',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Data: ', data);
            if(data.titulo.length == 0) {
              return;
            }
            else {
              lista.titulo = data.titulo;
              this.deseosService.editarLista(lista);
              this.listaItem.closeSlidingItems();
            }
          }
        }
      ]
    });

    await alert.present();

  }

  ngOnInit() {}

}
