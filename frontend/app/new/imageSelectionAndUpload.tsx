'use client'
import {
  useRef, useState,
} from "react";
import {
  acceptedImageMimeTypes,
  FILE_SIZE_FIVE_MB,
} from "@/common/constants";
import { CircularSpinner } from "@/common/components/atoms";
import { UploadIcon } from "@/common/components/icons";
import toast from "react-hot-toast";
import Image from "next/image";
import { UseFormSetValue } from "react-hook-form";
import { pinataUploadUrl } from "@/common/utils/network/endpoints";
import lang from "@/common/lang";
import { TokenDTO } from "./types";

const { createIdea: { imageUpload: imageUploadCopy } } = lang

export const ImageSelectionAndUpload = ({
  errorField,
  errorMessage,
  setValue,
  value,
} : {
  errorField: boolean;
  errorMessage?: string;
  setValue: UseFormSetValue<TokenDTO>;
  value: string;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [uploadInProgress, setUploadInProgress] = useState(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      if (file.size > FILE_SIZE_FIVE_MB) {
        setError(imageUploadCopy.imageSizeError)
        return;
      }
      if (!acceptedImageMimeTypes.includes(file.type)) {
        setError(imageUploadCopy.imageType);
        return;
      }
      try {
        setUploadInProgress(true)
        const data = new FormData();
        data.set("file", file);
        const uploadRequest = await fetch(pinataUploadUrl, {
          method: "POST",
          body: data,
        });
        const IPFS_URL = await uploadRequest.json();
        setValue('imageUrl', IPFS_URL)
        setUploadInProgress(false)
      } catch (e) {
        setUploadInProgress(false)
        setError(imageUploadCopy.uploadError)
        toast.error(imageUploadCopy.uploadError)
      }
    }
  }

  const handleUploadFile = () => {
    fileInputRef.current?.click();
  }

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const element = event.target as HTMLInputElement;
    element.value = '';
  }
  return (
    <div className="flex flex-col">
      <label
        htmlFor="file"
        className="text-left w-max text-white font-medium text-sm"
      >
        {imageUploadCopy.title}
      </label>
      <input
        type="file"
        name="file"
        accept="image/png, image/jpeg"
        id="file"
        ref={fileInputRef}
        className="opacity-0 -z-10 absolute overflow-hidden"
        onChange={handleFileChange}
        onClick={handleInputClick}
      />
      {value ? (
        <div className="w-full h-auto rounded-xl overflow-hidden mt-2 bg-white/50">
          <Image
            src={value}
            alt="pinata"
            width={400}
            height={200}
            className="w-full h-auto"
            quality={50}
          />
        </div>
      ) : (
        <button
          type="button"
          className="bg-white mt-2 group uploadIconWithGradient disabled:pointer-events-none transition-transform duration-200 px-4 py-8 rounded-xl flex flex-col gap-1 items-center"
          disabled={uploadInProgress}
          onClick={handleUploadFile}
        >
          {uploadInProgress ? <CircularSpinner /> : <UploadIcon />}
          <span className="text-gray-400 text-sm font-medium group-hover:bg-gradient-to-b from-indigo-500 to-purple-500 group-hover:text-transparent group-hover:bg-clip-text">
            {uploadInProgress ? imageUploadCopy.uploading : imageUploadCopy.uploadLabel}
          </span>
        </button>
      )}
      {(error || errorField) && (
        <p className="mt-0.5 text-sm text-red-300">
          {errorMessage || error || ''}
        </p>
      )}
    </div>
  )
}
