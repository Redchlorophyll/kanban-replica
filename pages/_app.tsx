import "@/styles/globals.css";
import { KanbanContextProvider } from "@/context/kanbanContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <KanbanContextProvider>
      <Component {...pageProps} />
    </KanbanContextProvider>
  );
}
