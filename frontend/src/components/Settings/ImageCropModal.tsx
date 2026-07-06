import { useState } from "react";
import Cropper from "react-easy-crop";
import { X, Trash2 } from "lucide-react";
import { getCroppedImg, type Area } from "../../utils/cropImage";

type ImageCropModalProps = {
  image: string;
  onClose: () => void;
  onCropDone: (file: File, previewUrl: string) => void;
  onRemoveImage?: () => void;
  variant?: "profile" | "product";
};

const ImageCropModal = ({
  image,
  onClose,
  onCropDone,
  onRemoveImage,
  variant = "profile",
}: ImageCropModalProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const isProduct = variant === "product";

  async function handleSaveCrop() {
    if (!croppedAreaPixels) return;

    const croppedFile = await getCroppedImg(image, croppedAreaPixels);
    const previewUrl = URL.createObjectURL(croppedFile);

    onCropDone(croppedFile, previewUrl);
  }

  function handleRemove() {
    onRemoveImage?.();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-999 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-5 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer text-slate-500 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-slate-900">
          {isProduct ? "Crop Product Image" : "Crop Profile Image"}
        </h2>

        <p className="text-slate-500 mt-1">
          Adjust your photo and save crop.
        </p>

        <div className="relative h-80 bg-black rounded-xl overflow-hidden mt-5">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape={isProduct ? "rect" : "round"}
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, croppedPixels) => {
              setCroppedAreaPixels(croppedPixels);
            }}
          />
        </div>

        <div className="mt-5">
          <label className="text-sm font-semibold">Zoom</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full mt-2 cursor-pointer"
          />
        </div>

        {onRemoveImage && (
          <button
            type="button"
            onClick={handleRemove}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 cursor-pointer"
          >
            <Trash2 size={16} />
            Remove Image
          </button>
        )}

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveCrop}
            className="w-full cursor-pointer py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
          >
            Save Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;