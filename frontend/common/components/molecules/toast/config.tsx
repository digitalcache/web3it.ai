'use client'
import {
  AlertErrorIcon, AlertSuccessIcon,
} from "@/common/components/icons";

export const toasterConfig = {
  toastOptions: {
    duration: 5000,
    success: {
      icon: <AlertSuccessIcon className="text-white fill-white mr-3" />,
    },
    error: {
      icon: <AlertErrorIcon className="text-white fill-white mr-3" />,
    },
  },
  containerStyle: {
    right: 16,
    top: 40,
  },
}
