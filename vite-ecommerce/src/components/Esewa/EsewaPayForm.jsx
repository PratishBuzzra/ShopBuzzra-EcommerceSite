import React, { useEffect, useRef } from "react";
import { createSignature } from "./esewaUtils";

const EsewaPayForm = ({ totalAmount, transactionId, onPaymentSuccess }) => {
  const product_code = "EPAYTEST";
  const signature = createSignature({
    total_amount: totalAmount,
    transaction_uuid: transactionId,
    product_code,
  });
  const formRef = useRef(null);

  
  const base_url = import.meta.env.VITE_FRONTEND_URL;

  return (
    <form
      ref={formRef}
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
    >
      <input type="hidden" name="amount" value={totalAmount} />
      <input type="hidden" name="tax_amount" value="0" />
      <input type="hidden" name="total_amount" value={totalAmount} />
      <input type="hidden" name="transaction_uuid" value={transactionId} />
      <input type="hidden" name="product_code" value={product_code} />
      <input type="hidden" name="product_service_charge" value="0" />
      <input type="hidden" name="product_delivery_charge" value="0" />
      <input
        type="hidden"
        name="success_url"
        value={`${base_url}/success`}
      />
      <input
        type="hidden"
        name="failure_url"
        value={`${base_url}/failure`}
      />

      <input
        type="hidden"
        name="signed_field_names"
        value="total_amount,transaction_uuid,product_code"
      />
      <input type="hidden" name="signature" value={signature} />

      <button
        type="submit"
        className="bg-blue-600 text-white w-full py-3 rounded"
      >
        Pay with eSewa
      </button>
    </form>
  );
};

export default EsewaPayForm;
