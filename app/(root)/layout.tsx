import NavBar from "@/app/components/NavBar";
import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "../globals.css";
import "../theme-config.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Theme appearance="light" accentColor="crimson" radius="large">
        <NavBar />
        <main className="p-6">{children}</main>
      </Theme>
    </div>
  );
}
