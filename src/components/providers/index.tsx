import { ThemeProvider } from "@/components/theme/provider";
import LenisProvider from "./lenis-provider";
import { AudioProvider } from "./audio-provider";

export default function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <AudioProvider>
        <LenisProvider>
          {children}
        </LenisProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}