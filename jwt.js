import jwt from 'jsonwebtoken'
export const authenticate=(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        if(!token)
        {
            return res.status(401).json({
                success:false,
                message:"No token found "
            });
        }

        const decodedToken=jwt.verify(token,'secret123');
        req.user=decodedToken.tokenPayload;
        next();
        
    }
    catch(error)
    {
        res.status(401).json({
            success:false,
            message:"Authentication failed"
        })
    }
}

