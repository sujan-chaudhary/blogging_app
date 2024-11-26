export const authorizeAdmin = (req , res, next)=>{
    if(req.user.role !== "superadmin") return res.status(403).send("Forbidden");
    next();
}