import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { AdItem } from '../ad-item';
import { AdDirective } from '../ad.directive';
import { AdComponent } from '../ad.component';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.css']
})
export class AdBannerComponent implements AfterViewInit, OnDestroy {

  // get data ads from AppComponent
  @Input() ads: AdItem[];
  //
  currentAddIndex: number = -1;
  //
  @ViewChild(AdDirective) adHost: AdDirective;
  //
  interval: any;

  //Inject ComponentFactoryResolve to use later
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit() {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    // Choose an Ad using math
    this.currentAddIndex = (this.currentAddIndex + 1) % this.ads.length;
    // Use the currentAddIndex value to select an adItem from the array
    let adItem = this.ads[this.currentAddIndex];

    // ComponentFactoryResolver resolve a ComponentFactory for each specific component
    // The ComponentFactory then creates an instance of each component
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    // Targeting the viewContainerRef that exists on this specific instance of the component. 
    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    // To add the component to the template, you call createComponent() on ViewContainerRef.
    // The createComponent() method returns a reference to the loaded component. 
    // Use that reference to interact with the component by assigning to its properties or calling its methods.
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}
