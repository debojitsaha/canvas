// @ts-nocheck
import React from "react";
import CanvasEditor from "./components/CanvasEditor";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <CanvasEditor />
    </div>
  );
};

export default Home;
