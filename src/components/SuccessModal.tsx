import React from "react";
import { CheckCircle } from "lucide-react";

type Props = {
  open: boolean;
  title?: string;
  message?: string;
  onOK: () => void;
};

const SuccessModal: React.FC<Props> = ({
  open,
  title = "Order successfully created!",
  message = "Your order has been sent to admin, Please confirmation your order.",
  onOK,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      {/* Card */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-[101] w-[90%] max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl"
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle className="h-7 w-7 text-emerald-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{message}</p>
        <button
          onClick={onOK}
          className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-white hover:bg-emerald-700 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
