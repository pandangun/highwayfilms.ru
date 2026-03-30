import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-bgc min-h-screen text-fgc">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
