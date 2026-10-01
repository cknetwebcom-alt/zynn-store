
async function loadAnalytics(){
 const res = await fetch('/api/dashboard');
 const data = await res.json();
 const canvas = document.getElementById('salesChart');
 if(!canvas || !window.Chart) return;
 new Chart(canvas,{
  type:'bar',
  data:{
   labels:['Products','Orders'],
   datasets:[{
    label:'Count',
    data:[data.products||0,data.orders||0]
   }]
  }
 });
}
loadAnalytics();
