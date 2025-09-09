import { useCallback, useState } from "react";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

let toastCount = 0;

export const toast = ({
  title,
  description,
  variant = "default",
}: ToastProps) => {
  const id = (++toastCount).toString();

  // Create a simple toast notification
  const toastElement = document.createElement("div");
  toastElement.className = `fixed top-4 right-4 z-50 max-w-sm w-full bg-white border rounded-lg shadow-lg p-4 ${
    variant === "destructive" ? "border-red-200 bg-red-50" : "border-gray-200"
  }`;

  toastElement.innerHTML = `
    <div class="flex items-start">
      <div class="flex-1">
        ${
          title
            ? `<h4 class="font-medium text-sm ${
                variant === "destructive" ? "text-red-800" : "text-gray-900"
              }">${title}</h4>`
            : ""
        }
        ${
          description
            ? `<p class="text-sm ${
                variant === "destructive" ? "text-red-600" : "text-gray-600"
              } mt-1">${description}</p>`
            : ""
        }
      </div>
      <button class="ml-2 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `;

  document.body.appendChild(toastElement);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toastElement.parentElement) {
      toastElement.remove();
    }
  }, 5000);

  return {
    id,
    dismiss: () => {
      if (toastElement.parentElement) {
        toastElement.remove();
      }
    },
  };
};

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: ToastProps) => {
    const id = (++toastCount).toString();
    const newToast: Toast = { id, ...toast };
    setToasts((prev) => [...prev, newToast]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);

    return id;
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    toasts,
    addToast,
    dismissToast,
    toast: addToast,
  };
};
