import { X, AlertTriangle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type RemoveOrderProps = {
  orderCode: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

const RemoveOrder = ({
  orderCode,
  onClose,
  onConfirm,
}: RemoveOrderProps) => {
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);

  const isMatched =
    confirmText.trim().toLowerCase() === orderCode.trim().toLowerCase();

  const handleRemove = async () => {
    if (!isMatched || loading) return;

    try {
      setLoading(true);
      await onConfirm();
      onClose();
    } catch (error) {
      toast.error("Failed to remove order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Remove Order
              </h2>
              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        <p className="mb-3 text-sm text-gray-600">
          Write the order ID to confirm:
        </p>

        <div className="mb-4 rounded-xl bg-gray-100 px-4 py-3 font-semibold text-slate-900">
          {orderCode}
        </div>

        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Write the order ID"
          className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="h-11 cursor-pointer rounded-xl border border-gray-300 px-5 font-semibold text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleRemove}
            disabled={!isMatched || loading}
            className={`h-11 rounded-xl px-5 font-semibold text-white ${
              isMatched && !loading
                ? "cursor-pointer bg-red-600 hover:bg-red-700"
                : "cursor-not-allowed bg-red-300"
            }`}
          >
            {loading ? "Removing..." : "Remove Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveOrder;