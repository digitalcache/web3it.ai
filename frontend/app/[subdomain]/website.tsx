import { IdeaType } from "@/common/types";
import Image from "next/image";

export const Website = ({ idea } : { idea: IdeaType }) => {
  return (
    <div
      style={{
        transform: 'rotateX(6deg) translateY(-16px)',
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="w-full border-2 md:border-3 border-[#6C6C6C] p-3 md:p-6 bg-zinc-900 rounded-3xl md:rounded-[30px] shadow-2xl"
    >
      {idea ? (
        <Image
          src={`https://api.apiflash.com/v1/urltoimage?access_key=490dad84ce6c4aa2aa74a3f4a97fd34a&wait_until=page_loaded&url=${idea.productUrl}`}
          // src={`https://image.thum.io/get/maxAge/12/width/1872/png/noanimate/fullpage/wait/3/${idea.productUrl}`}
          quality={100}
          className="w-full h-auto rounded-xl"
          width={1200}
          height={800}
          alt={idea.name}
        />
      ) : null}
    </div>
  );
};
