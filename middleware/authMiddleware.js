import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {
        // 1. Get token from cookie
        const token = req.cookies.token;

        // 2. If token doesn't exist
        if (!token) {
            return res.status(401).json({
                message: "Not authenticated"
            });
        }

        // 3. Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Store user ID in request
        req.userId = decoded.id;

        // 5. Continue to the route
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;