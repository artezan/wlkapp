import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() type: 'list';
  @Input() items: any[] = [];
  @Input() title: string;
  @Input() subTitle: string;
  @Input() isSearch: boolean;

  realData: any = [];
  constructor(navParams: NavParams, public modalController: ModalController) {}

  ngOnInit() {
    this.realData = this.items;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      if (changes.items.currentValue) {
        this.items = changes.items.currentValue;
        this.realData = this.items;
      }
    }
  }
  searhcItem(str: string) {
    console.log(str);
    this.items = this.realData;
    this.items = this.items.filter(p => {
      const index = JSON.stringify(p)
        .toLocaleLowerCase()
        .indexOf(str);
      console.log(index);
      if (index !== -1) {
        return true;
      }
    });
  }
  dismiss(value) {
    this.modalController.dismiss({
      result: value,
    });
  }
}
