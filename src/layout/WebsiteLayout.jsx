import  { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";
import Header from "../components/websitePartials/header";
import Footer from "../components/websitePartials/footer";
const Layout = () => {
  const {pathname} = useLocation()
  useEffect(()=>{
    window.scrollTo({top:0 , behavior:"smooth"})
  },[pathname])
  return (
    <>
      <ToastContainer position="bottom-right" theme="colored"/>
      <Header />
      <Suspense fallback={<Loading />}>
        <motion.div
          key={location.pathname}
          initial="pageInitial"
          animate="pageAnimate"
          exit="pageExit"
          variants={{
            pageInitial: {
              opacity: 0,
              y: 50,
            },
            pageAnimate: {
              opacity: 1,
              y: 0,
            },
            pageExit: {
              opacity: 0,
              y: -50,
            },
          }}
          transition={{
            type: "tween",
            ease: "easeInOut",
            duration: 0.5,
          }}
        >
          {<Outlet />}
        </motion.div>
      </Suspense>
      <Footer />
    </>
  );
};

export default Layout;
