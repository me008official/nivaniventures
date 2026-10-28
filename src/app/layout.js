import { Geist, Geist_Mono, Playwrite_US_Modern, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const playwriteUSModern = Playwrite_US_Modern({
  weight: ['400'], // You can choose '100', '200', '300', or '400'
  variable: '--font-playwrite', // Creates a CSS variable for Tailwind/global CSS
  display: 'swap',
});
const bricolage = Bricolage_Grotesque({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage', // Optional: if you want a CSS variable
});

export const metadata = {
  title: "Nivani Ventures Kalimpong- Sustainable & Eco-Friendly Products ",
  description: "Nivini is a company that specializes in sustainable and eco-friendly products, offering a range of customizable options for environmentally conscious consumers.",
  keywords: "Nivini, sustainable products, eco-friendly, customizable, nature-inspired, green living",
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playwriteUSModern.variable} ${bricolage.variable} h-full antialiased`}
    >
        <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
