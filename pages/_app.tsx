import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/customThemes/glass.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />;
      <ToastContainer autoClose={8000} />
    </>
  );
}

export default MyApp;
