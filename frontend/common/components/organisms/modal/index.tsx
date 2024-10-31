
"use client";
import { useOutsideClick } from "@/common/hooks";
import { cn } from "@/utils/helpers";
import {
  AnimatePresence, motion,
} from "framer-motion";
import React, {
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { Button } from "../../atoms";

export function Modal ({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export const ModalTrigger = ({
  children,
  disabled = false,
  onClick,
  setIsModalOpen,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  setIsModalOpen: (value: boolean) => void;
}) => {
  return (
    <Button
      size="md"
      type="button"
      variant="primary"
      disabled={disabled}
      onClick={async () => {
        if (onClick) {
          await onClick()
        }
        setIsModalOpen(true)
      }}
      className="transition-all w-full mt-4 duration-150 disabled:bg-space-cadet/40 bg-space-cadet hover:bg-space-cadet/80 font-semibold"
    >
      {children}
    </Button>
  );
};

export const ModalBody = ({
  children,
  className,
  isModalOpen,
  setIsModalOpen,
}: {
  children: ReactNode;
  className?: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}) => {

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  const modalRef = useRef(null);

  useOutsideClick({
    isVisible: false,
    ref: modalRef,
    callback: () => setIsModalOpen(false),
  });

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(10px)",
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full  flex items-center justify-center z-50"
        >
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              "max-w-[calc(100%-40px)] md:max-w-[820px] bg-eerie-black border-neutral-800 rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden",
              className,
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}
          >
            <CloseIcon setIsModalOpen={setIsModalOpen} />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col flex-1 ", className)}>
      {children}
    </div>
  );
};

export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex justify-center p-4 bg-eerie-black",
        className,
      )}
    >
      {children}
    </div>
  );
};

const Overlay = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(10px)",
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
      className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}
    ></motion.div>
  );
};

const CloseIcon = ({ setIsModalOpen } : { setIsModalOpen: (value: boolean) => void }) => {
  return (
    <button
      onClick={() => setIsModalOpen(false)}
      className="absolute top-4 right-4 group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  );
};
