import "./globals.css";
import ClientLayout from "@/client-layout";
import TopBar from "@/components/TopBar/TopBar";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";

export const metadata = {
  title: "House Of Eleven | Premium Architecture & Design",
  description: "House Of Eleven - Creating spaces that feel rooted, human, and quietly bold through thoughtful architecture and interior design.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <TopBar />
          <AudioPlayer />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
