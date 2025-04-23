import type { Metadata } from 'next';
import './globals.css';
import { Providers } from "@block-kit/ui";

export const metadata: Metadata = {
  title: 'Block Kit Web Example',
  description: 'Example application using Block Kit components',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 