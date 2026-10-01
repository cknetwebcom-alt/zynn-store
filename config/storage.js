
// Supabase Storage helper
const supabase = require('./supabase');

async function uploadFile(bucket, path, fileBuffer, contentType){
  const result = await supabase.storage
    .from(bucket)
    .upload(path, fileBuffer, {contentType, upsert:true});
  if(result.error) throw result.error;

  const url = supabase.storage.from(bucket).getPublicUrl(path);
  return url.data.publicUrl;
}

module.exports = { uploadFile };
