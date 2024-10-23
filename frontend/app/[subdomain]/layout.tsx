import { ReactNode } from "react";
import { 
  Footer, Header,
} from "@/common/components/organisms";

export default function Layout ({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <Header links={false} />
      {children}
      <Footer />
    </div>
  )
}
