import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

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
  Popup:boolean=false;
  User:any;
  constructor(private Router : Router){

  }
  ngOnInit(){
    let user=localStorage.getItem('user');
    if(!user){
       this.Router.navigate(['/login']);
       return;
    }
    this.User = JSON.parse(user);

  }
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
    let sum1=this.MonthlyCurrent /  this.MonthlyFirst;
    let sum2= 1/(this.CurrentIndomeAge - this.FirstIncomeAge);
    console.log(sum1,sum2)
    let sum3= Math.pow(sum1, sum2)-1;
    let Percent= Math.round(sum3 * 100);
    this.GrowwthOfSalary= Percent + "%";
    let sum4=Math.pow(1+sum3,(this.CurrentIndomeAge - this.FirstIncomeAge));
    let sum5=this.AnnuallyFirst*(sum4-1);
    this.TotalIncomeErned=Math.round(sum5/sum3);
    let sum6 = Math.round((this.NetAssetAfterLoans/this.TotalIncomeErned)*100);
    this.PErcentageContributed = sum6 + '%';
    this.SendEmail();
    this.Popup=true;
  }
  change1(){
    this.AnnuallyFirst=this.MonthlyFirst*12;
  }
  change2(){
    this.AnnuallyCurrent=this.MonthlyCurrent*12;
  }

  Submit8(){
    this.Popup=false;
  }
  SendEmail(){
    try {
      let res=emailjs.send("service_1jupduc","template_ekisfjh",{
        from_name: this.User.Name,
        name:this.User.Name,
        number: this.User.Number,
        Start_Age: this.FirstIncomeAge,
        Current_Age: this.CurrentIndomeAge,
        First_Salary_Monthly:this.MonthlyFirst,
        First_Salary_Annually: this.AnnuallyFirst,
        Current_Salary_Monthly:this.MonthlyCurrent,
        Current_Salary_Annually: this.AnnuallyCurrent,
        Cureent_PF: this.SavingMFPF,
        Real_Estate: this.RealEstate,
        Home_Lone: this.HomeLoans,
        Total_Months: this.TotalMonths,
        monthly_contribution: this.MonthlyContri,
        Net_asset: this.NetAssetAfterLoans,
        Growth_salary: this.GrowwthOfSalary,
        Total_income: this.TotalIncomeErned,
        percentage: this.PErcentageContributed,
        },"18xINzm2JV4Gv5lVo");
    } catch (error) {
       console.log(error)
    }
  }
}
