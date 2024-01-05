import { Request, Response } from "express";
import jsonwebtoken, {JwtPayload} from "jsonwebtoken";

export default async function auth(request: Request, response: Response) {
    try {
        const token = request.headers['authorization'];
        const decoded = jsonwebtoken.verify(token || "", process.env.JWT || "") as JwtPayload;
        const userInfo = { name: decoded.name, email: decoded.email }
        response.status(200).send(userInfo);
    } catch {
        response.status(401).send();
    }
}