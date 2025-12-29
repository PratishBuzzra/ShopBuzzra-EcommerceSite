import CryptoJS from 'crypto-js';

export function createSignature({ total_amount, transaction_uuid, product_code }) {
  const secret = '8gBm/:&EnhH.1/q';
  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  const hash = CryptoJS.HmacSHA256(message, secret);
  return CryptoJS.enc.Base64.stringify(hash);
}
