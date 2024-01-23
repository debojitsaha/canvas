import React, { useEffect, useState } from "react";
import CanvasEditor from "./components/CanvasEditor";
import { Button, Input } from "antd";
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

  // @ts-ignore
  const eyeDropper = new EyeDropper();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const content = reader.result;
        setMaskImage(content);
      };
      reader.readAsDataURL(file);

      reader.onerror = (error) => {
        console.error("Error", error);
      };
    }
  };

  const handleEyeDropperClick = () => {
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
      console.warn("EyeDropper API not available in this browser");
    }
  };

  useEffect(() => {
    localStorage.setItem("recentColors", JSON.stringify(recentColors));
  }, [recentColors]);

  return (
    <div className={styles.container}>
      <CanvasEditor
        captionText={captionText}
        ctaText={ctaText}
        maskImage={maskImage}
        backgroundColor={backgroundColor}
      />
      <div className={styles.input_container}>
        <Input
          size="large"
          placeholder="Enter your caption text.."
          prefix={<TbTextCaption />}
          defaultValue={captionText}
          onChange={(e) => setCaptionText(e.target.value)}
        />
        <Input
          size="large"
          placeholder="Enter your cta text.."
          prefix={<TbAtom />}
          defaultValue={ctaText}
          onChange={(e) => setCtaText(e.target.value)}
        />
        <Input
          size="large"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
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
