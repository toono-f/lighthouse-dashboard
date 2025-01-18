import "./globals.css";

export const metadata = {
  title: "Performance Dashboard",
  description: "Web Performance Monitoring Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
