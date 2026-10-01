
fetch('/api/dashboard',{
headers:{Authorization:'Bearer '+localStorage.token}
})
.then(r=>r.json())
.then(d=>{
stats.innerHTML=`
<h3>Products: ${d.products||0}</h3>
<h3>Orders: ${d.orders||0}</h3>`;
});
