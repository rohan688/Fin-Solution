import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'fin-solution';
  /////Section 1
  FirstIncomeAge:any='';
  CurrentIndomeAge:any='';
  //Section 2
  SavingMFPF:any=0;
  RealEstate:any=0;
  HomeLoans:any=0;
  OtherEMI:any=0;
  //Section 3
  MonthlyFirst:any='';
  AnnuallyFirst:any='';
  MonthlyCurrent:any='';
  AnnuallyCurrent:any="";
  //Result Section
  TotalMonths:any='';
  MonthlyContri:any='';
  NetAssetAfterLoans:any='';
  GrowwthOfSalary:any='';
  TotalIncomeErned:any='';
  PErcentageContributed:any='';
  Submit1(){
    if(this.FirstIncomeAge>this.CurrentIndomeAge){
      alert('Please Enter Valid Age!');
      return;
    }
    this.TotalMonths=(this.CurrentIndomeAge - this.FirstIncomeAge)*12;
    console.log(this.TotalMonths)
  }
  Submit2(){
    console.log('hit')
    this.NetAssetAfterLoans=(this.SavingMFPF+this.RealEstate) - (this.HomeLoans + this.OtherEMI);
    this.MonthlyContri=Math.round(this.NetAssetAfterLoans / this.TotalMonths);
  }

  Submit3(){
    this.AnnuallyFirst=this.MonthlyFirst*12;
    this.AnnuallyCurrent=this.MonthlyCurrent*12;
  }
}
