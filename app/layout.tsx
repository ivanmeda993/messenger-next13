import "../styles/globals.css";
import Header from "./Header";
import "moment-timezone";
import { Providers } from "./providers";
import { unstable_getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // @ts-ignore
  const session = await unstable_getServerSession();

  return (
    <html>
      <head />
      <body>
        {/*<Header session={session} />*/}
        {children}
      </body>
    </html>
  );
}
