export const metadata = {
  title: "Performance Dashboard",
  description: "High-performance real-time dashboard at 60fps",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans">{children}</body>
    </html>
  );
}
