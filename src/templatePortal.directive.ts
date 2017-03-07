import {
    Directive,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { TemplatePortal } from './portal';

@Directive({
    selector: '[clPortal]',
    exportAs: 'clPortal'
})

export class ClTemplatePortalDirective extends TemplatePortal {
    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
        super(templateRef, viewContainerRef);
    }
}
