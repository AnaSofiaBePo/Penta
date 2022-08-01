import { Component, OnInit, ViewChild } from '@angular/core';
import { IonAccordionGroup } from '@ionic/angular';

@Component({
  selector: 'app-multiple-login',
  templateUrl: './multiple-login.page.html',
  styleUrls: ['./multiple-login.page.scss'],
})
export class MultipleLoginPage implements OnInit {
  @ViewChild('accordionGroup1', { static: true }) accordionGroup1: IonAccordionGroup;
  @ViewChild('accordionGroup2', { static: true }) accordionGroup2: IonAccordionGroup;
  @ViewChild('accordionGroup3', { static: true }) accordionGroup3: IonAccordionGroup;
  @ViewChild('accordionGroup4', { static: true }) accordionGroup4: IonAccordionGroup;
  isTouched = false;
  constructor() {}

  ngOnInit() {}

  isLogOut() {
    this.isTouched = !this.isTouched;
  }

  toggleAccordion = () => {
    const nativeEl = this.accordionGroup1;
    if (nativeEl.value === 'first') {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = 'first';
    }
  };

}
