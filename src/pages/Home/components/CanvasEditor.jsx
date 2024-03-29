import React, { useEffect, useRef } from "react";
import CanvasDrawer from "./CanvasDrawer";
// @ts-ignore
import image from "../../../assets/image.png";
// @ts-ignore
import Design_Pattern from "../../../assets/Design_Pattern.png";
// @ts-ignore
import Mask_stroke from "../../../assets/Mask_stroke.png";
// @ts-ignore
import mask from "../../../assets/mask.png";
import { data } from "../../../constants/data";
// @ts-ignore
import styles from "../Home.module.scss";

const templateData = data;

const CanvasComponent = ({
  captionText,
  ctaText,
  maskImage,
  backgroundColor,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasDrawer = new CanvasDrawer(canvas);

    canvasDrawer.draw(backgroundColor); // Initial drawing

    canvasDrawer.drawImageInRectangle(Design_Pattern, 0, 0, 1080, 1080);
    canvasDrawer.drawImageInRectangle(image, 820, 10, 160, 140);
    canvasDrawer.drawImageInMask(mask, 0, 0, 1080, 1080);
    canvasDrawer.drawImageInMask(Mask_stroke, 0, 0, 1080, 1080);

    canvasDrawer.drawCaption(templateData.caption, captionText);
    canvasDrawer.drawCTA(templateData.cta, ctaText);

    canvasDrawer.drawImageOverMask(maskImage, 56, 442, 970, 600);

    // Cleanup function
    return () => {
      canvasDrawer.clear();
    };
  }, [captionText, ctaText, maskImage, backgroundColor]);

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
