import { Secret, SignOptions } from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";

// encode jwt token function shape
export interface EncodeJWTToken {
    (payload: object, secret:Secret, options?: SignOptions): Promise<string>
}
export interface VerifyToken {
    (headers: IncomingHttpHeaders): Promise<any>;
}