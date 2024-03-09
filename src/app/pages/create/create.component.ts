import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  modeTypes: any
  movementTypes: any
  incotermsTypes: any
  countries: any
  cities: any
  packageTypes: any
  unit1Types: any
  unit2Types: any
  currencyTypes: any

  countryId : any = 0
  cityId : any = 0
  modeType : any = 0
  movementType: any = 0
  incotermsType: any = 0
  packageType: any = 0
  unit1Type: any = 0
  unit2Type: any = 0
  currencyType: any = 0

  requestObj : any = {}

  constructor(private http: HttpClient, private router:Router){}

  ngOnInit(): void {
    this.http.get('http://localhost:5065/api/CommonValues')
    .subscribe((response:any) => {
      this.countries = response.data.countries
      this.modeTypes = response.data.enums.ModeTypes
      this.movementTypes = response.data.enums.MovementTypes
      this.incotermsTypes = response.data.enums.IncotermsTypes
      this.packageTypes = response.data.enums.PackageTypes
      this.unit1Types = response.data.enums.Unit1Types
      this.unit2Types = response.data.enums.Unit2Types
      this.currencyTypes = response.data.enums.CurrencyTypes
    })
  }

  onSubmit(){
    this.requestObj['modeType'] = parseInt(this.modeType)
    this.requestObj['movementType'] = parseInt(this.movementType)
    this.requestObj['incotermsType'] = parseInt(this.incotermsType)
    this.requestObj['packageType'] = parseInt(this.packageType)
    this.requestObj['unit1Type'] = parseInt(this.unit1Type)
    this.requestObj['unit2Type'] = parseInt(this.unit2Type)
    this.requestObj['currencyType'] = parseInt(this.currencyType)
    this.requestObj['countryId'] = parseInt(this.countryId)
    this.requestObj['cityId'] = parseInt(this.cityId)

    this.http.post('http://localhost:5065/api/Offers',this.requestObj)
    .subscribe((response:any) => {
      if(response.succeeded){
        this.router.navigateByUrl('/dashboard')
      }
      else{
        alert(response.error)
      }
    })
  }

  onCountryChange(){
    const country = this.countries.find((item: any) => item.id === +this.countryId);
    if(country){
      this.cities = country.cities
    }
    else{
      this.cities = []
    }
  }
  
}