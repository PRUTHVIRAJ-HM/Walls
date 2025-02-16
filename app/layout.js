import {Poppins} from'next/font/google'
import "./globals.css";

const poppins=Poppins({subsets:['latin'],weight:["400","500","600","700"]})

export const metadata = {
  title: "Wallsy",
  description: "A Wallpaper site for the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
