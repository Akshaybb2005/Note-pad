import prisma from './prismaclient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const register=async(req,res)=>{
    const{name,email,password}=req.body;
   try{ 
    if(!name||!email||!password){
        return res.status(400).json({message:"All fields are required"});
    }
    const user=await prisma.user.findUnique({where:{email}});
    if(user){
        return res.status(400).json({message:"User already exists"});
    }
    const hashedpassword=await bcrypt.hash(password,10);
    const newuser=await prisma.user.create({
        data:{name,email,password:hashedpassword}
    });
    const token=jwt.sign({userId:newuser.id},process.env.JWT_SECRET,{expiresIn:'1d'});
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'strict',
        maxAge:24*60*60*1000
    })
    const {password:_,...safeUser}=newuser;
    res.status(201).json({message:"User registered successfully",user:safeUser});
}catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
   }
}
const login=async(req,res)=>{
const{email,password}=req.body;
try{
    const user=await prisma.user.findUnique({
    where:{email}
});
if(!user){
    return res.status(400).json({message:"User not found"});
}
const ispasswordvalid=await bcrypt.compare(password,user.password);
if(!ispasswordvalid){
    return res.status(400).json({message:"Invalid password"});
}
const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'3d'});
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'strict',
        maxAge:24*60*60*1000
    })
 const { password: _, ...safeUser } = user;

res.status(200).json({message:"Login successful",user:safeUser});
}catch(error){
    console.error(error);
    res.status(500).json({message:"Internal server error"});
}
}
const update=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        if(!req.user?.id){
            return res.status(401).json({message:"Unauthorized"});
        }
        const updatedUser=await prisma.user.update({
            where:{id:req.user.id},
            data:{name,email,password}
        });
        const {password:_,...safeUser}=updatedUser;
        res.status(200).json({message:"User updated successfully",user:safeUser});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
};  
const logout=async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
        });
        res.status(200).json({message:"Logout successful"});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
};
const checkAuth=async(req,res,next)=>{
        try{   const token=req.cookies.token;
            if(!token){
                return res.status(401).json({message:"Unauthorized"});
            }
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user={id:decode.id};
            next();
}catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}
export {register,login,update,logout,checkAuth};