/**
 * Class that will assist in sending/handling our different HTTP error responses
 */

class HttpError extends Error {
    readonly errorCode: number;

    constructor(message: string, errorCode: number){
        super (message);
        this.errorCode = errorCode;
    }
}

export default HttpError;