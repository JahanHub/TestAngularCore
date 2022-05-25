import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
 public purchaseList: any[];
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

  }


}
