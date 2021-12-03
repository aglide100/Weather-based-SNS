import "../styles/common.css";
import Layout from "../components/Layout";
import RequireLogin from "../components/RequireLogin";
import UsingMobileWrapper from "../components/UsingMobileWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";

function App({ Component, pageProps }) {
  const router = useRouter();

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
          <Layout title="Weather Based SNS"></Layout>
          <Component {...pageProps}></Component>
        </motion.div>
      </AnimatePresence>
      {/* </RequireLogin> */}
    </UsingMobileWrapper>
  );
}

export default App;
