import {
    Directive,
    ComponentFactoryResolver,
    ViewContainerRef,
    OnDestroy,
    Input,
} from '@angular/core';
import { Portal, TemplatePortal, BasePortalHost } from './portal';

@Directive({
    selector: '[clPortalHost]'
})
export class ClPortalHostDirective extends BasePortalHost implements OnDestroy {
    /** The attached portal. */
    private _portal: Portal<any>;

    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _viewContainerRef: ViewContainerRef) {
        super();
    }

    /** Portal associated with the Portal host. */
    @Input('clPortalHost')
    set portal(p: Portal<any>) {
        if (p) {
            this._replaceAttachedPortal(p);
        }
    }
    get portal(): Portal<any> {
        return this._portal;
    }

    ngOnDestroy() {
        this.dispose();
    }

    /**
     * Attach the given TemplatePortal to this PortlHost as an embedded View.
     * @param portal Portal to be attached.
     */
    attachTemplatePortal(portal: TemplatePortal): Map<string, any> {
        portal.setAttachedHost(this);

        this._viewContainerRef.createEmbeddedView(portal.templateRef);
        this.setDisposeFn(() => this._viewContainerRef.clear());

        return new Map<string, any>();
    }

    /** Detaches the currently attached Portal (if there is one) and attaches the given Portal. */
    private _replaceAttachedPortal(p: Portal<any>): void {
        if (this.hasAttached()) {
            this.detach();
        }

        if (p) {
            this.attach(p);
            this._portal = p;
        }
    }
}
