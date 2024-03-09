import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,PagingConfig {
  offers: OfferData[] = []

  tableSize = [3,5,8,12]
  
  totalItems: number = 0
  itemsPerPage: number = 3
  currentPage: number = 1

  pagingConfig: PagingConfig = {} as PagingConfig;


  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.getOffers()
  }

  onPageChange(page: number) {
    this.getOffers(page,this.itemsPerPage)
  }

  getOffers(page:number=1, size:number=3){
    this.http.get(`http://localhost:5065/api/Offers?page=${page}&pageSize=${size}`)
    .subscribe((response:any) => {
      this.offers = response.data.offers
      this.totalItems = response.data.total
      this.itemsPerPage = response.data.pageSize
      this.currentPage = response.data.page
    })
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }

  onTableSizeChange(e:any){
    this.itemsPerPage = e.target.value
    this.getOffers(1,this.itemsPerPage)
  }
}

export interface OfferData {
  id : number,
  modeType: string,
  movementType: string,
  incotermsType: string,
  packageType: string,
  unit1Type: string,
  unit2Type: string,
  currencyType: string,
  country: string,
  city: string
}

export interface PagingConfig{
  currentPage: number,
  itemsPerPage: number,
  totalItems: number
}
