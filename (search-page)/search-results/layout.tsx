import { Eczar } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/(main-page)/components/Header";
import Provider from "@/components/Provider";

const font = Eczar({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <Header />
      <main>{children}</main>
    </Provider>
  );
}
