import { ClError } from './error';

/**
 * Exception thrown when attempting to attach a null portal to a host.
 * @docs-private
 */
export class NullPortalError extends ClError {
    constructor() {
        super('Must provide a portal to attach');
    }
}

/**
 * Exception thrown when attempting to attach a portal to a host that is already attached.
 * @docs-private
 */
export class PortalAlreadyAttachedError extends ClError {
    constructor() {
        super('Host already has a portal attached');
    }
}

/**
 * Exception thrown when attempting to attach a portal to an already-disposed host.
 * @docs-private
 */
export class PortalHostAlreadyDisposedError extends ClError {
    constructor() {
        super('This PortalHost has already been disposed');
    }
}

/**
 * Exception thrown when attempting to attach an unknown portal type.
 * @docs-private
 */
export class UnknownPortalTypeError extends ClError {
    constructor() {
        super(
            'Attempting to attach an unknown Portal type. ' +
            'BasePortalHost accepts either a ComponentPortal or a TemplatePortal.');
    }
}

/**
 * Exception thrown when attempting to attach a portal to a null host.
 * @docs-private
 */
export class NullPortalHostError extends ClError {
    constructor() {
        super('Attempting to attach a portal to a null PortalHost');
    }
}

/**
 * Exception thrown when attempting to detach a portal that is not attached.
 * @docs-private
 */
export class NoPortalAttachedError extends ClError {
    constructor() {
        super('Attempting to detach a portal that is not attached to a host');
    }
}
