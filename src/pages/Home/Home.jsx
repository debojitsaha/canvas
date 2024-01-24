import React, { useEffect, useState } from "react";
import CanvasEditor from "./components/CanvasEditor";
import { Button, Form, Input, message } from "antd";
import { TbAtom, TbPlus, TbTextCaption } from "react-icons/tb";
import { data } from "../../constants/data";
// @ts-ignore
import coffee from "assets/coffee.jpeg";
import { ChromePicker } from "react-color";
// @ts-ignore
import styles from "./Home.module.scss";

const Home = () => {
  const [captionText, setCaptionText] = useState(data.caption.text);
  const [ctaText, setCtaText] = useState(data.cta.text);

  const [maskImage, setMaskImage] = useState(coffee);
  const [recentMaskImages, setRecentMaskImages] = useState(
    JSON.parse(localStorage.getItem("recentMaskImages")) ?? []
  );

  const [backgroundColor, setBackgroundColor] = useState(
    JSON.parse(localStorage.getItem("recentColors")) &&
      JSON.parse(localStorage.getItem("recentColors")).length > 0
      ? JSON.parse(localStorage.getItem("recentColors"))[0]
      : "#0369A1"
  );
  const [recentColors, setRecentColors] = useState(
    JSON.parse(localStorage.getItem("recentColors")) ?? []
  );
  const [openColorPicker, setOpenColorPicker] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const content = reader.result;
        setMaskImage(content);
        setRecentMaskImages((prevImages) => {
          const updatedImages = [content, ...prevImages.slice(0, 2)];
          return updatedImages;
        });
      };
      reader.readAsDataURL(file);

      reader.onerror = (error) => {
        console.error("Error", error);
      };
    }
  };

  const handleEyeDropperClick = () => {
    // @ts-ignore
    const eyeDropper = new EyeDropper();
    // Check if the EyeDropper API is available in the browser
    if (eyeDropper) {
      eyeDropper.open().then((color) => {
        console.log(color);
        setBackgroundColor(color.sRGBHex);
        setOpenColorPicker(false);
        setRecentColors((prevColors) => {
          const updatedColors = [color.sRGBHex, ...prevColors.slice(0, 4)];
          return updatedColors;
        });
      });
    } else {
      message.error("EyeDropper API not available in this browser");
    }
  };

  useEffect(() => {
    localStorage.setItem("recentColors", JSON.stringify(recentColors));
  }, [recentColors]);

  useEffect(() => {
    localStorage.setItem("recentMaskImages", JSON.stringify(recentMaskImages));
  }, [recentMaskImages]);

  return (
    <div className={styles.container}>
      <div className={styles.canvas_container}>
        <CanvasEditor
          captionText={captionText}
          ctaText={ctaText}
          maskImage={maskImage}
          backgroundColor={backgroundColor}
        />
        {recentMaskImages.length > 0 && (
          <>
            <span className={styles.recently}>Recently upload images</span>
            <div className={styles.recent_mask_images}>
              {recentMaskImages.map((image) => (
                <div
                  key={image}
                  className={styles.mask_image}
                  onClick={() => setMaskImage(image)}
                >
                  <img
                    src={image}
                    alt="Recent Mask Image"
                    className={styles.recent_mask_image}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className={styles.input_container}>
        <div className={styles.header}>
          <h3>Ad Customization</h3>
          <span>Customize your canvas and get the output accordingly</span>
        </div>
        <Form layout="vertical">
          <Form.Item label="Caption Text">
            <Input
              size="large"
              placeholder="Enter your caption text.."
              prefix={<TbTextCaption />}
              defaultValue={captionText}
              onChange={(e) => setCaptionText(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="CTA Text">
            <Input
              size="large"
              placeholder="Enter your cta text.."
              prefix={<TbAtom />}
              defaultValue={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Select Image">
            <Input
              size="large"
              type="file"
              accept="image/*"
              placeholder="Upload your mask image.."
              onChange={handleFileChange}
            />
          </Form.Item>
        </Form>
        <div className={styles.recent_colors}>
          {recentColors.map((color, index) => (
            <div
              key={index}
              style={{
                backgroundColor: color,
                width: "30px",
                height: "30px",
                margin: "5px",
                cursor: "pointer",
                borderRadius: "50%",
              }}
              onClick={() => {
                setBackgroundColor(color);
                if (color !== backgroundColor) {
                  setRecentColors((prevColors) => {
                    const updatedColors = [
                      color,
                      ...prevColors.slice(0, prevColors.length - 1),
                    ];
                    return updatedColors;
                  });
                }
                setOpenColorPicker(false);
              }}
            />
          ))}
          <Button
            shape="circle"
            size="large"
            type="primary"
            icon={<TbPlus size={24} />}
            onClick={(e) => {
              e.stopPropagation();
              setOpenColorPicker(!openColorPicker);
              !openColorPicker && handleEyeDropperClick();
            }}
          />
        </div>
        {openColorPicker && (
          <div>
            <ChromePicker
              color={backgroundColor}
              onChange={(color) => {
                setBackgroundColor(color.hex);
              }}
              onChangeComplete={(color) => {
                setTimeout(() => {
                  setRecentColors((prevColors) => {
                    const updatedColors = [
                      color.hex,
                      ...prevColors.slice(0, 4),
                    ];
                    return updatedColors;
                  });
                }, 1000);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
