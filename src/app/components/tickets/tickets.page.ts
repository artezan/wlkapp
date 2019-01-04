import { Component, OnInit } from '@angular/core';
import { FbTicketsService } from 'src/app/services/fb-tickets.service';
import { ITicket } from 'src/app/models/ticket.model';
import { WalmartService } from 'src/app/services/walmart.service';
import { IProduct } from 'src/app/models/product.model';
import {
  LoadingController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AlertInput } from '@ionic/core';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
  ticketInput: ITicket;
  allTickets: ITicket[] = [];
  storeId = '0000003864';
  isLoad: boolean;
  constructor(
    public ticketService: FbTicketsService,
    private walmartService: WalmartService,
    public loadingController: LoadingController,
    private router: Router,
    public alertController: AlertController,
    public modalController: ModalController,
  ) {}

  ngOnInit() {
    this.getTickets();
  }
  getTickets() {
    this.isLoad = false;
    this.ticketService.getAll().then(data => {
      this.allTickets = data;
      this.isLoad = true;
    });
  }
  link() {
    const input = document.getElementById('file1').click();
  }
  fileRead(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      // console.log(e.target.result);
      const xml: string = e.target.result;
      const str = xml.substring(xml.indexOf('<?xml'));
      this.ticketService.xmlToJson(str).subscribe(res => {
        console.log(JSON.parse(res.result1));
        this.traslateXML(JSON.parse(res.result1));
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }
  async traslateXML(ticket: any) {
    // name:  "cfdi:Comprobante"
    const firstElement = ticket.elements[0];

    const productsOnXml: any[] = firstElement.elements
      .find(el => el.name === 'cfdi:Conceptos')
      .elements.map(el => {
        el.attributes['NoIdentificacion'] = el.attributes[
          'NoIdentificacion'
        ].substring(1);
        return el.attributes;
      });

    this.ticketInput = {
      date: firstElement.attributes.Fecha,
      realPrice: firstElement.attributes.Total,
      prePrice: firstElement.attributes.SubTotal,
      discount: firstElement.attributes.Descuento
        ? firstElement.attributes.Descuento
        : 0,
    };
    this.ticketInput.products = await this.getProducts(productsOnXml);
    this.addTicketToFB();
  }
  private async getProducts(prod: any[]) {
    const loading = await this.presentLoading();
    loading.present();
    const promise = new Promise<IProduct[]>(async resolve => {
      const product: IProduct[] = [];
      for (const p of prod) {
        const data = await this.walmartService
          .getSKU(p.NoIdentificacion, p.NoIdentificacion, this.storeId)
          .toPromise();
        if (data.codeMessage === '-1') {
          console.log(p);

          product.push({
            longDescription: p.Descripcion,
            skuDisplayNameText: p.Descripcion,
            sku: p.NoIdentificacion,
            specialPrice: p.ValorUnitario,
            department: null,
            isPriceStrike: false,
            skuId: p.NoIdentificacion,
            status: null,
            basePrice: p.ValorUnitario,
            imgURL: null,
            importPrice: p.Importe,
            quantity: p.Cantidad,
            keyUnity: p.ClaveUnidad,
            description: p.Descripcion,
            unity: p.Unidad,
            valueUnited: p.ValorUnitario,
          });
        } else {
          product.push({
            longDescription: data.longDescription,
            skuDisplayNameText: data.skuDisplayNameText,
            sku: data.sku,
            specialPrice: data.specialPrice,
            department: data.department,
            isPriceStrike: data.isPriceStrike,
            skuId: data.skuId,
            status: data.status,
            basePrice: data.basePrice,
            imgURL: `https://super.walmart.com.mx/images/product-images/img_large/${
              data.skuId
            }L.jpg`,
            importPrice: p.Importe,
            quantity: p.Cantidad,
            keyUnity: p.ClaveUnidad,
            description: p.Descripcion,
            unity: p.Unidad,
            valueUnited: p.ValorUnitario,
          });
        }
      }
      const finalProducts = product.map(r => {
        let res: IProduct = {};
        res = r;
        Object.keys(r).forEach(key => {
          if (r[key] === undefined) {
            res[key] = null;
          }
        });
        return finalProducts;
      });

      resolve(product);
    });
    const result = await promise;
    loading.dismiss();

    return result;
  }
  addTicketToFB() {
    this.ticketService.saveTicket(this.ticketInput).then(res => {
      this.getTickets();
    });
  }
  deleteById(id: string) {
    this.ticketService.deleteByIdTicket(id).then(() => {
      this.getTickets();
    });
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Subiendo...',
    });
    return await loading;
  }
  goToDetails(ticket?: ITicket) {
    if (ticket) {
      const data: NavigationExtras = { queryParams: { id: ticket.id } };
      this.router.navigate(['tickets/details'], data);
    } else {
      this.router.navigate(['tickets/details']);
    }
  }
  setStoreId(zipCode, colony) {
    this.walmartService.getStores(zipCode, colony).subscribe(data => {
      console.log(data);
    });
  }
  async presentAlertPrompt() {
    const propInput: AlertInput[] = [
      {
        name: 'colony',
        type: 'text',
        label: 'Colonia',
        placeholder: 'Colonia',
      },
      {
        name: 'zip',
        type: 'text',
        placeholder: 'CP',
      },
    ];
    const alert = await this.alertController.create({
      header: 'Tienda',
      subHeader: 'Llene los campos',
      message: 'Se buscara la tienda',
      inputs: propInput,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('');
          },
        },
        {
          text: 'Aceptar',
          role: 'ok',
          handler: () => {
            console.log('');
          },
        },
      ],
    });

    await alert.present();
    await alert.onWillDismiss().then(res => {
      if (res.role === 'ok') {
        this.setStoreId(res.data.values.zip, res.data.values.colony);
      }
    });
  }
  async setModal() {
    const modal = await this.presentModal(
      ['this.tickets'],
      'Selecciona Ticket',
      'Selecciona Dos',
      'date',
      'checkbox',
    );
    modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.result) {
      // acciones
    }
  }

  private async presentModal(items: any[], title, subTitle, prop, type) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        type,
        items,
        title,
        isSearch: true,
        subTitle,
        prop,
      },
      backdropDismiss: true,
      showBackdrop: true,
    });

    return await modal;
  }
}
