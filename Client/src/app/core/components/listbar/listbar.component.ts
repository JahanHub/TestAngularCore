import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListBarProperties } from '../../models/list-bar.model';

@Component({
  selector: 'list-bar',
  templateUrl: './listbar.component.html',
  styleUrls: ['./listbar.component.css']
})
export class ListbarComponent implements OnInit {
  @Input() itemList: any[];
  @Input() listTitle: any[];
  @Input() properties: ListBarProperties;

  @Output() select = new EventEmitter<any>();
  public selectedIndex:number;

  constructor() { }

  ngOnInit(): void {
  }

  getOthersValue(item){
    let output: string = '';
    for (let index = 0; index < this.properties.Others.length; index++) {
      let value = item[this.properties.Others[index]];
      if (typeof value == 'string') {
        const conValue = Date.parse(value);
        if(!isNaN(conValue)){
          value =formatDate(conValue,'yyyy-MM-dd hh:mm a','en');
        }
      }
      output += value + ' - ';
    }
    output = output.substring(0,output.length - 3);
    return output;
  }

  onItemSelected(item,index){
    this.select.emit(item);
    console.log(index);
    this.selectedIndex = index;
  }

  // public isSelected(id) {
  //   return (
  //     this.frmBuyerOrder.value[`id`] !== null &&
  //     id === this.frmBuyerOrder.value[`id`]
  //   );
  // }


}
