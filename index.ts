import { ClNgMessagesComponent } from './src/ngMessage.component';
import { ClNgMessageDirective } from './src/ngMessage.directive';
import { ClPortalHostDirective } from './src/portalHost.directive';
import { ClTemplatePortalDirective } from './src/templatePortal.directive';
import {
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ClPortalHostDirective,
    ClTemplatePortalDirective,
    ClNgMessageDirective,
    ClNgMessagesComponent
  ],
  exports: [
    ClPortalHostDirective,
    ClTemplatePortalDirective,
    ClNgMessageDirective,
    ClNgMessagesComponent
  ]
})
export class ClNgMessageModule { }
