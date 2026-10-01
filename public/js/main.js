fetch('/api/products')
.then(r=>r.json())
.then(data=>{
document.getElementById('products').innerHTML=data.map(p=>`
<div class='card'>
<h2>${p.name}</h2>
<p>${p.price}</p>
</div>`).join('');
});