import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListBarProperties } from '../../models/list-bar.model';

@Component({
  selector: 'list-bar',
  templateUrl: './listbar.component.html',
  styleUrls: ['./listbar.component.css']
})
export class ListbarComponent implements OnInit {
  @Input() itemList: any[];
  @Input() properties: ListBarProperties;

  @Output() select = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  getOthersValue(item){
    let output: string = '';
    for (let index = 0; index < this.properties.Others.length; index++) {
      output += item[this.properties.Others[index]] + ' - ';
    }
    output = output.substring(0,output.length - 3);
    return output;
  }

  onItemSelected(item){
    this.select.emit(item);
    //console.log('onItemSelected',item);
  }
}
