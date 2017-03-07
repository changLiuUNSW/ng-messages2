[![NPM Version](http://img.shields.io/npm/v/ng-messages2.svg?style=flat)](https://www.npmjs.org/package/ng-messages2) [![Build Status](https://travis-ci.org/changLiuUNSW/ng-messages2.svg?branch=master)](https://travis-ci.org/changLiuUNSW/ng-messages2)

# ng-messages2 - Angular version of ng-message

Angular version of [ng-message](https://docs.angularjs.org/api/ngMessages/directive/ngMessage).

This libary is still in progress. Please check out our list of issues to see all the things we are implementing

## Installation

To install this library, run:

```bash
$ npm install ng-messages2 --save
```

## Usage

import ```ClNgMessageModule``` in your app's main module ```app.module.ts```:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import ng-messages2
import { ClNgMessageModule } from 'ng-messages2';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify ng-messages2 as an import
    ClNgMessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once it is imported, you can use it in your Angular application:

```xml
<!-- You can now use ng-messages2 in app.component.html -->
<form [formGroup]="formGroup">
    <label for="phoneNumber">Phone Number</label>
        <input type="text" id="phoneNumber" name="phoneNumber" formControlName="phoneNumber" required>
        <cl-ng-messages [control]="formGroup.get('phoneNumber')">
          <template clNgMessage="required">
             This is required
          </template>
          <template clNgMessage="pattern">
            the format of phone number is not correct
          </template>
        </cl-ng-messages>
</form>
```

## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Chang Liu](mailto:3dslayer@gmail.com)
