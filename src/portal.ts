import {
    TemplateRef,
    ViewContainerRef,
    ElementRef
} from '@angular/core';
import {
    NullPortalHostError,
    PortalAlreadyAttachedError,
    NoPortalAttachedError,
    NullPortalError,
    PortalHostAlreadyDisposedError,
    UnknownPortalTypeError
} from './portal-errors';

/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalHost`.
 */
export abstract class Portal<T> {
    private _attachedHost: PortalHost;

    /** Attach this portal to a host. */
    attach(host: PortalHost): T {
        if (host == null) {
            throw new NullPortalHostError();
        }

        if (host.hasAttached()) {
            throw new PortalAlreadyAttachedError();
        }

        this._attachedHost = host;
        return <T>host.attach(this);
    }

    /** Detach this portal from its host */
    detach(): void {
        const host = this._attachedHost;
        if (host == null) {
            throw new NoPortalAttachedError();
        }

        this._attachedHost = null;
        return host.detach();
    }

    /** Whether this portal is attached to a host. */
    get isAttached(): boolean {
        return this._attachedHost != null;
    }

    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     */
    setAttachedHost(host: PortalHost) {
        this._attachedHost = host;
    }
}

/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
export class TemplatePortal extends Portal<Map<string, any>> {
    /** The embedded template that will be used to instantiate an embedded View in the host. */
    templateRef: TemplateRef<any>;

    /** Reference to the ViewContainer into which the template will be stamped out. */
    viewContainerRef: ViewContainerRef;

    /**
     * Additional locals for the instantiated embedded view.
     * These locals can be seen as "exports" for the template, such as how ngFor has
     * index / event / odd.
     * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
     */
    locals: Map<string, any> = new Map<string, any>();

    constructor(template: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
        super();
        this.templateRef = template;
        this.viewContainerRef = viewContainerRef;
    }

    get origin(): ElementRef {
        return this.templateRef.elementRef;
    }

    attach(host: PortalHost, locals?: Map<string, any>): Map<string, any> {
        this.locals = locals == null ? new Map<string, any>() : locals;
        return super.attach(host);
    }

    detach(): void {
        this.locals = new Map<string, any>();
        return super.detach();
    }
}


/**
 * A `PortalHost` is an space that can contain a single `Portal`.
 */
export interface PortalHost {
    attach(portal: Portal<any>): any;

    detach(): any;

    dispose(): void;

    hasAttached(): boolean;
}


/**
 * Partial implementation of PortalHost that only deals with attaching either a TemplatePortal.
 */
export abstract class BasePortalHost implements PortalHost {
    /** The portal currently attached to the host. */
    private _attachedPortal: Portal<any>;

    /** A function that will permanently dispose this host. */
    private _disposeFn: () => void;

    /** Whether this host has already been permanently disposed. */
    private _isDisposed: boolean = false;

    /** Whether this host has an attached portal. */
    hasAttached() {
        return this._attachedPortal != null;
    }

    attach(portal: Portal<any>): any {
        if (portal == null) {
            throw new NullPortalError();
        }

        if (this.hasAttached()) {
            throw new PortalAlreadyAttachedError();
        }

        if (this._isDisposed) {
            throw new PortalHostAlreadyDisposedError();
        }

        if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }

        throw new UnknownPortalTypeError();
    }

    abstract attachTemplatePortal(portal: TemplatePortal): Map<string, any>;

    detach(): void {
        if (this._attachedPortal) { this._attachedPortal.setAttachedHost(null); }

        this._attachedPortal = null;
        if (this._disposeFn != null) {
            this._disposeFn();
            this._disposeFn = null;
        }
    }

    dispose() {
        if (this.hasAttached()) {
            this.detach();
        }

        this._isDisposed = true;
    }

    setDisposeFn(fn: () => void) {
        this._disposeFn = fn;
    }
}
