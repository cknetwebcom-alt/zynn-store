async function sendOrder(){
await fetch('/api/orders',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
customer_name:name.value,
contact:phone.value,
status:'pending'
})
});
alert('Order sent');
}