const jwt = require('jsonwebtoken');



const authMiddleware = async (req,res,next) => {
            
        try {
            const authHeader = await req.headers.authorization;
    
            if(!authHeader || !authHeader.startsWith(`Bearer `)){
                res.status(401).json({message: "no token found"})
            }
    
            const token = authHeader.split(' ')[1];
    
            var decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.user = decoded;
    
            next();
            
        } catch (error) {
            return res.status(400).json({message: "unauthorize token"})
        }

}

module.exports = authMiddleware