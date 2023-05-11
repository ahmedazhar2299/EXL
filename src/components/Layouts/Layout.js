import { motion } from "framer-motion";
import Header from "../Header/Header";
import { useState } from "react";
import Footer from "../Footer/Footer";
const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 },
};

const Layout = ({ children, title }) => {
  document.title = title + " | Artsy";
  const [activeKey, setActiveKey] = useState(null);
  return (
    <div>
      <motion.article
        //  initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.45, type: "easeInOut" }}
        style={{ position: "relative" }}
      >
        <Header
          appearance="default"
          activeKey={activeKey}
          onSelect={setActiveKey}
        />
        <div className="sm:mt-14 mb-60">{children}</div>
      </motion.article>
      <Footer />
    </div>
  );
};

export default Layout;
