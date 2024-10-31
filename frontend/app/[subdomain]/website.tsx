import { IdeaType } from "@/common/types";
import { blurDataUrl } from "@/common/utils/blurDataUrl";
import Image from "next/image";

export const Website = ({
  idea,
} : {
  idea: IdeaType;
}) => {

  return (
    <div
      style={{
        transform: 'rotateX(6deg) translateY(-16px)',
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className={`w-full border-2 md:border-3 border-[#6C6C6C] p-3 md:p-6 bg-zinc-900 rounded-3xl md:rounded-[30px]`}
    >
      {idea?.productScreenshotUrl ? (
        <Image
          src={idea.productScreenshotUrl}
          quality={100}
          className="w-full h-auto rounded-xl"
          width={1200}
          height={800}
          alt={idea?.name}
          placeholder="blur"
          blurDataURL={blurDataUrl}
        />
      ) : (
        <div className="w-full h-[60vh] bg-zinc-900"></div>
      )}
    </div>
  );
};
