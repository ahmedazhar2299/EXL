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
  document.title = title + " | EXL";
  const [activeKey, setActiveKey] = useState(null);
  return (
    <div className="flex flex-col min-h-screen">
      <motion.article
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.45, type: "easeInOut" }}
        style={{ flex: 1 }}
      >
        <Header
          appearance="default"
          activeKey={activeKey}
          onSelect={setActiveKey}
        />
        <div className="sm:mt-14">{children}</div>
      </motion.article>
      <Footer />
    </div>
  );
};

export default Layout;
