import { FormikHandlers } from "formik";

interface PaymentFieldProps {
  handleChange: FormikHandlers["handleChange"];
}

const PaymentField = ({ handleChange }: PaymentFieldProps) => {
  return (
    <div className="form-field">
      <label className="block text-black text-sm mb-[5px] min-h-[20px]">
        Форма оплати:
      </label>
      <select
        name="payment_method"
        className="input-with-error-style border cursor-pointer mb-[10px]"
        onChange={handleChange}
      >
        <option value="G">Готівка</option>
        <option value="C">Картою онлайн</option>
        <option value="Q">Оплата через QR при отримані</option>
      </select>
    </div>
  );
};

export default PaymentField;
