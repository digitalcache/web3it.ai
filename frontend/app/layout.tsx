import {
  ReactNode,
  Suspense,
} from "react";
import { Poppins } from 'next/font/google';
import './globals.css'

const primaryFont = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-primaryFont',
});

export const metadata = {
  title: 'Web3.it.ai',
  description: 'Translate ideas into Web3 projects',
}

export default function RootLayout ({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${primaryFont.variable} font-primary bg-dark-background`}>
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
