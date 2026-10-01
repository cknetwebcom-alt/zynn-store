
async function uploadPayment(file){
 const form = new FormData();
 form.append('file', file);
 const res = await fetch('/api/upload/payment',{
  method:'POST',
  body:form
 });
 return await res.json();
}
