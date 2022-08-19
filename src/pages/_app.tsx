import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { SignInClassProvider } from "../contexts/SignInClassProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SignInClassProvider>
      <Component {...pageProps} />
    </SignInClassProvider>
  );
}

export default MyApp;
