
document.getElementById('productForm').onsubmit=async(e)=>{
e.preventDefault();
await fetch('/api/products',{
method:'POST',
headers:{
'Content-Type':'application/json',
'Authorization':'Bearer '+localStorage.token
},
body:JSON.stringify({
name:name.value,
category:category.value,
price:Number(price.value),
description:description.value,
image_url:image_url.value
})
});
alert('Product saved');
};
