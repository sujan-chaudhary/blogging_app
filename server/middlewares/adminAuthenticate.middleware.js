import jwt from "jsonwebtoken";

export const adminAuthenticate = (req, res, next) => {
    const token = req.cookies.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
    
    if (!token) return res.status(401).send("Access denied !");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send("Token expired!");
        }
        res.status(400).send("Invalid token !");
    }
}
