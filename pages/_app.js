import { SWRConfig } from "swr";
import GlobalStyle from "../styles";

export default function App({ Component, pageProps }) {
  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error("An error occured while fetching the data!");
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }

    return res.json();
  };

  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
