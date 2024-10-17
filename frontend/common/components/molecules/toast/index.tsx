'use client';
import { Transition } from "@headlessui/react";
import {
  Toaster as ReactToaster, Toast, ToastIcon, resolveValue,
} from "react-hot-toast";
import { cn } from "@/utils/helpers";
import { toasterConfig } from "./config";

export const Toaster = () => {
  return (
    <ReactToaster
      {...toasterConfig}
      position="top-center"
    >
      {(toast: Toast) => {
        return (
          <Transition
            appear
            show={toast.visible}
            className={cn(
              'transform p-4 rounded-2xl flex items-center text-2xl',
              toast.type === 'success' ? 'bg-green-200' : 'bg-red-200',
            )}
            enter="transition-all duration-150"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            <ToastIcon toast={toast} />
            <p
              className={cn(
                toast.type === 'success' ? 'text-green-800' : 'text-red-800',
                'text-sm',
              )}
            >
              {resolveValue(toast.message, toast)}
            </p>
          </Transition>
        )
      }}
    </ReactToaster>
  );
};
