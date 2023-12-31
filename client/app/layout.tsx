import { Footer, Navbar } from '@/components';
import { UserContextProvider } from '../context/UserContext';
import './globals.css';

export const metadata = {
  title: "Car Hub",
  description: "Discover world's best car showcase",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative">
        <UserContextProvider>
          <Navbar />
          {children}
          <Footer />
        </UserContextProvider>
      </body>
    </html>
  )
}
