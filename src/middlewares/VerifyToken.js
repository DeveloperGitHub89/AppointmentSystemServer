import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';

export const verifyToken = (privateKey) => (request, response, next) => {
    const authHeader = request.get('Authorization');
    if (!authHeader) {
        return response.status(StatusCodes.UNAUTHORIZED)
            .json({ message: 'Access Denied' });
    }
    else {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, privateKey, (error, payload) => {
            if (error) {
                return response.status(StatusCodes.UNAUTHORIZED)
                    .json({ message: 'Access Denied' });
            } else {
                next();
            }
        });
    }
}
