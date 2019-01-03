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
  @Input() type: 'list' | 'checkbox';
  @Input() items: any[] = [];
  @Input() title: string;
  @Input() subTitle: string;
  @Input() isSearch: boolean;
  @Input() prop: string;
  arrSelect: any[] = [];

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
    this.items = this.realData;
    this.items = this.items.filter(p => {
      const index = JSON.stringify(p)
        .toLocaleLowerCase()
        .indexOf(str);
      if (index !== -1) {
        return true;
      }
    });
  }
  setArr(event: boolean, item) {
    if (event) {
      this.arrSelect.push(item);
    } else {
      const index = this.arrSelect.findIndex(arr => arr === item);
      this.arrSelect.splice(index, 1);
    }
  }
  dismiss(item) {
    this.modalController.dismiss({
      result: item,
    });
  }
}
