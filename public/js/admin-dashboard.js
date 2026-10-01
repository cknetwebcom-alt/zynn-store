async function load(){
const token=localStorage.token||"";
const res=await fetch('/api/dashboard',{
headers:{Authorization:'Bearer '+token}
});
const data=await res.json();
document.getElementById('stats').innerHTML=
`Products: ${data.products||0}<br>Orders: ${data.orders||0}`;
}
load();