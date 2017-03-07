import {
    Component,
    AfterContentInit,
    QueryList,
    ContentChildren,
    ViewEncapsulation,
    Input
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClNgMessageDirective } from './ngMessage.directive';

@Component({
    selector: 'cl-ng-messages',
    encapsulation: ViewEncapsulation.None,
    host: {
        'role': 'alert',
        '[class.error-messages-container]': 'true',
        '[hidden]': '!_currentError'
    },
    template: `<ng-content></ng-content>
               <div class="error-message">
                    <template [ngIf]="_currentError">
                        <template [clPortalHost]="_currentError"></template>
                    </template>
                </div>
`
})
export class ClNgMessagesComponent implements AfterContentInit {
    /** Content for the error message given by <template clNgMessage>. */
    @ContentChildren(ClNgMessageDirective)
    errorMessages: QueryList<ClNgMessageDirective>;

    _currentError: ClNgMessageDirective = null;

    @Input()
    control: FormControl;

    private _messages: { [type: string]: ClNgMessageDirective } = {};

    ngAfterContentInit() {
        this._registerErrorMessages();
        this._controlChanged();
    }

    _registerErrorMessages() {
        this.errorMessages.forEach(error => {
            if (error.type) {
                this._messages[error.type] = error;
            }
        });
    }

    _controlChanged() {
        this.control.valueChanges.subscribe((data?: any) => {
            let messageFound = false;
            if (this.control.dirty && this.control.invalid) {
                for (const type in this._messages) {
                    if (this.control.hasError(type)) {
                        messageFound = true;
                        this._currentError = this._messages[type];
                        break;
                    }
                }
            }
            if (!messageFound) {
                this._currentError = null;
            }
        });
    }
}
