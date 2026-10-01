require('dotenv').config();
const express=require('express');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const supabase=require('./config/supabase');
const upload=require('./config/upload');

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

function auth(req,res,next){
 try{
  const header=req.headers.authorization||'';
  const token=header.startsWith('Bearer ') ? header.split(' ')[1] : null;
  if(!token) return res.status(401).json({message:'Unauthorized'});
  jwt.verify(token,process.env.JWT_SECRET);
  next();
 }catch(e){res.status(401).json({message:'Unauthorized'});}
}

app.post('/api/admin/login',(req,res)=>{
 if(req.body.username===process.env.ADMIN_USERNAME &&
 req.body.password===process.env.ADMIN_PASSWORD){
  return res.json({token:jwt.sign({admin:true},process.env.JWT_SECRET)});
 }
 res.status(401).json({message:'Login failed'});
});

app.get('/api/products',async(req,res)=>{
 const {data,error}=await supabase.from('products').select('*');
 if(error)return res.status(500).json(error);
 res.json(data);
});

app.post('/api/products',auth,async(req,res)=>{
 const {data,error}=await supabase.from('products').insert(req.body).select();
 if(error)return res.status(500).json(error);
 res.json(data);
});

app.get('/api/orders',auth,async(req,res)=>{
 const {data,error}=await supabase.from('orders').select('*');
 if(error)return res.status(500).json(error);
 res.json(data);
});

app.get('/api/dashboard',auth,async(req,res)=>{
 const products=await supabase.from('products').select('id',{count:'exact',head:true});
 const orders=await supabase.from('orders').select('id',{count:'exact',head:true});
 res.json({
  products:products.count||0,
  orders:orders.count||0
 });
});



app.post('/api/upload/:bucket', auth, upload.single('file'), async(req,res)=>{
 if(!req.file) return res.status(400).json({message:'No file'});
 const path=Date.now()+'-'+req.file.originalname;
 const {error}=await supabase.storage.from(req.params.bucket)
 .upload(path, req.file.buffer, {contentType:req.file.mimetype, upsert:true});
 if(error) return res.status(500).json(error);
 const url=supabase.storage.from(req.params.bucket).getPublicUrl(path);
 res.json({url:url.data.publicUrl});
});

app.get('/api/analytics', auth, async(req,res)=>{
 const products=await supabase.from('products').select('*');
 const orders=await supabase.from('orders').select('*');
 const revenue=(orders.data||[]).reduce((a,b)=>a+Number(b.total_amount||0),0);
 res.json({
  products:(products.data||[]).length,
  orders:(orders.data||[]).length,
  revenue
 });
});

if (require.main === module) {
 app.listen(process.env.PORT||3000,()=>console.log('Zynn Store v4 Running'));
}

module.exports = app;
