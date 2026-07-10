import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { cancelOrder } from "../../../Api/customerApi";

type CancelOrderProps = {
  orderId: string;
  productName: string;
  orderCode?: string;
  onClose: () => void;
  onSuccess: (orderId: string) => void;
};

const CancelOrder = ({
  orderId,
  productName,
  orderCode,
  onClose,
  onSuccess,
}: CancelOrderProps) => {
  const [confirmText, setConfirmText] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);

  const isMatched =
    confirmText.trim().toLowerCase() === productName.trim().toLowerCase();

  const handleCancelOrder = async () => {
    if (!isMatched || cancelLoading) return;

    try {
      setCancelLoading(true);

      const response = await cancelOrder(orderId);

      if (response.data.success) {
        toast.success("Order cancelled successfully.");

        onSuccess(orderId);
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[28px] bg-white p-6 shadow-2xl md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle size={22} className="text-red-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Cancel Order?
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={cancelLoading}
            className="cursor-pointer text-gray-500 transition hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X size={24} />
          </button>
        </div>

        <p className="mt-5 text-gray-600">
          Are you sure you want to cancel order{" "}
          {orderCode && (
            <span className="font-semibold text-gray-900">#{orderCode}</span>
          )}{" "}
          for{" "}
          <span className="font-semibold text-gray-900">
            &quot;{productName}&quot;
          </span>
          ?
        </p>

        <p className="mt-5 text-sm font-semibold text-gray-900">
          Type{" "}
          <span className="font-bold text-red-600">
            &quot;{productName}&quot;
          </span>{" "}
          to confirm your action.
        </p>

        <input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder={`Type ${productName}`}
          autoFocus
          disabled={cancelLoading}
          className="mt-3 w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-red-500 disabled:cursor-not-allowed disabled:bg-gray-100"
        />

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={cancelLoading}
            className="cursor-pointer rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Keep Order
          </button>

          <button
            type="button"
            disabled={!isMatched || cancelLoading}
            onClick={handleCancelOrder}
            className={`rounded-xl px-5 py-3 font-semibold text-white transition ${
              isMatched && !cancelLoading
                ? "cursor-pointer bg-red-600 hover:bg-red-700"
                : "cursor-not-allowed bg-gray-300"
            }`}
          >
            {cancelLoading ? "Cancelling..." : "Cancel Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;