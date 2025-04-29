import { useState, useCallback } from "react";

interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const openConfirm = useCallback((opts: ConfirmOptions) => {
    setOptions(opts);
    setIsOpen(true);
  }, []);

  const closeConfirm = () => {
    setIsOpen(false);
    setTimeout(() => setOptions(null), 300); // allow exit transition
  };

  const ConfirmDialog = isOpen && options ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6 mx-4 animate-fade-in">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {options.title || "Confirm Action"}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {options.message || "Are you sure you want to proceed?"}
        </p>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            aria-label="Cancel"
            onClick={closeConfirm}
            className="px-4 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {options.cancelText || "Cancel"}
          </button>
          <button
          type="button"
            aria-label="Confirm"
            onClick={() => {
              options.onConfirm();
              closeConfirm();
            }}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            {options.confirmText || "Confirm"}
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return { openConfirm, ConfirmDialog };
};
