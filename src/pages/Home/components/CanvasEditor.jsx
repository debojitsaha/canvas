// @ts-nocheck
import React, { useEffect, useRef } from "react";
import CanvasDrawer from "./CanvasDrawer";
import image from "assets/image.png";
import coffee from "assets/coffee.jpeg";
import Design_Pattern from "assets/Design_Pattern.png";
import Mask_stroke from "assets/Mask_stroke.png";
import mask from "assets/mask.png";
import styles from "../Home.module.scss";
import { data } from "../../../constants/data";

const templateData = data;
const CanvasComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasDrawer = new CanvasDrawer(canvas);

    canvasDrawer.draw(); // Initial drawing

    canvasDrawer.drawImageInRectangle(Design_Pattern, 0, 0, 1080, 1080);
    canvasDrawer.drawImageInMask(mask, 0, 0, 1080, 1080);
    canvasDrawer.drawImageInRectangle(coffee, 56, 442, 970, 600);
    canvasDrawer.drawImageInMask(Mask_stroke, 0, 0, 1080, 1080);
    canvasDrawer.drawImageInRectangle(image, 800, 10, 72, 72);

    canvasDrawer.drawCaption(templateData.caption);
    canvasDrawer.drawCTA(templateData.cta);

    // Cleanup function
    return () => {
      canvasDrawer.clear();
    };
  }, []);

  return (
    <canvas
      className={styles.canvas_editor}
      ref={canvasRef}
      width="1080"
      height="1080"
    />
  );
};

export default CanvasComponent;
