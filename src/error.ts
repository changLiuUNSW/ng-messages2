/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
export class ClError extends Error {
    constructor(value: string) {
        super();
        this.message = value;
    }
}
