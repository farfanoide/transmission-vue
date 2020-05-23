import axios from 'axios'

export function BlobToBase64 (blob)
{
  return new Promise((resolve, reject) =>
    {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result.replace(/^data:.+;base64,/, ''));
      };

      reader.onerror = reject;

      reader.readAsDataURL(blob);
    })
}
