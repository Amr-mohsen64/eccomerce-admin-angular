import { PromotionAdsService } from './../../Services/promotion-ads.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreData } from 'src/app/ViewModels/store-data';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  storeInfo: StoreData;
  isImageShown: boolean = true;

  private subscriptions: Subscription[] = [];
  ads :string[] = []

  constructor(
    private promotionAds: PromotionAdsService
  ) {
    this.storeInfo = new StoreData('ITI Store',
      'https://picsum.photos/350/200',
      ['Cairo', 'Alex', 'Qena', 'Assiut']);

  }

  ngOnInit(): void {

    // this.subscription = this.promotionAds.getSheduleAds(3).subscribe({
    // if the  component had multible subscribtion say on db make the varibale
    // this.subscription array 

    let observer = {
      next: (data: string) => {
        console.log(data)
        this.ads.push(data)
      },
      error: (err: string) => {
        console.log(err)
      },
      complete: () => {
        console.log("Ads Finsihed")
      }
    }

    // filter
    let filterObservable = this.promotionAds.getSheduleAds(1).pipe(
      filter(ad =>ad.includes("white Friday")),
      map(ad =>"Ad :"+ad)
    )
    //subscribe on it
    let subscription = filterObservable.subscribe(observer)
    this.subscriptions.push(subscription)



    // let sub = this.promotionAds.getSerialAdds().subscribe(ad => {
    //   console.log(ad);
    // })
    // this.subscriptions.push(sub)
  }


  toggleImage() {
    this.isImageShown = !this.isImageShown;
  }

  ngOnDestroy(): void {
    //after we leave the component (Product) unsbsicribe all the observals
    // this.subscription.unsubscribe()
    if (this.subscriptions.length !== 0) { 
      for (let subscription of this.subscriptions) {
        subscription.unsubscribe()
      }
    }
  }

}
