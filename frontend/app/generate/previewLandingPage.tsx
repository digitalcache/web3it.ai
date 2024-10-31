import { blurDataUrl } from "@/common/utils/blurDataUrl"
import Image from "next/image"

export const PreviewLandingPage = ({ image } : { image: string }) => {
  return (
    <div
      style={{
        transform: 'rotateX(6deg)',
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className={`w-full border-2 md:border-3 border-[#6C6C6C] p-3 md:p-6 bg-zinc-900 rounded-3xl md:rounded-[30px] shadow-2xl`}
    >
      <Image
        alt="preview"
        width={500}
        height={500}
        placeholder="blur"
        blurDataURL={blurDataUrl}
        className="w-full h-auto" src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`}
      />
    </div>
  )
}
