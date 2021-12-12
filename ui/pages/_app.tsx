import "../styles/common.css";
import Layout from "../components/Layout";
import RequireLogin from "../components/RequireLogin";
import UsingMobileWrapper from "../components/UsingMobileWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import { ReactElement, useEffect, useState } from "react";

function App({ Component, pageProps }) {
  const router = useRouter();

  const [header, setHeader] = useState<ReactElement>(null);
  useEffect(() => {
    if (router.isReady) {
      if (router.pathname.includes("/admin")) {
        setHeader(<>{/* passed */}</>);
      } else {
        setHeader(
          <>
            <Layout title="Hello for Weather-based-SNS"></Layout>
          </>
        );
      }
    }
  }, [router.isReady]);
  return (
    <UsingMobileWrapper>
      {/* <RequireLogin> */}
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.div
          key={router.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {header}
          <Component {...pageProps}></Component>
        </motion.div>
      </AnimatePresence>
      {/* </RequireLogin> */}
    </UsingMobileWrapper>
  );
}

export default App;
