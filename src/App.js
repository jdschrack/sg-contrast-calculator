import React, { useEffect, useState } from "react";
import "./styles.css";
import { CommonStyles } from "./tools/styles";
import { hexToRgb, getLuminance } from "./tools/utility";

const App = () => {
  const [colorFocus, setColorFocus] = useState(false);
  const [hexValue, setHexValue] = useState();
  const [rgbValue, setRgbValue] = useState({ red: 0, green: 0, blue: 0 });
  const [luminance, setLuminance] = useState();
  const [sampleTextColor, setSampleTextColor] = useState();

  const styles = {
    ...CommonStyles,
    main: {
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      margin: "16px"
    },
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      boxShadow:
        "0px 6px 30px rgba(0, 0, 0, 0.08), 0px 1px 6px rgba(0, 0, 0, 0.04)",
      borderRadius: "12px",
      paddingLeft: "16px",
      paddingRight: "16px"
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column"
    },
    headlineText: {
      paddingTop: "24px",
      fontWeight: "700",
      fontSize: "32px",
      lineHeight: "40px"
    },
    buttonArea: {
      display: "flex",
      flexGrow: "auto",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      marginTop: "16px"
    },
    primaryContent: {
      display: "flex",
      padding: 0,
      flexDirection: "row"
    },
    rgbValues: {
      margin: 0,
      padding: 0,
      borderBottomWidth: "1px",
      borderBottomColor: "#F4F7F7",
      borderBottomStyle: "solid",
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    rgbColorValue: {
      display: "flex",
      flex: "auto",
      justifyContent: "flex-end",
      fontSize: "18px",
      fontWeight: "800"
    }
  };

  const calculatedStyles = {
    sampleBlock: {
      display: "flex",
      flexDirection: "column",
      alignSelf: "flex-start",
      borderRadius: "8px",
      borderWidth: "1px",
      borderColor: "#BDBFBF",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
      flex: 1,
      margin: "0 0 0 16px",
      backgroundColor: hexValue && hexValue !== "" ? hexValue : "#BDBFBF",
      padding: "16px",
      height: "90%",
      color:
        sampleTextColor && sampleTextColor !== "" ? sampleTextColor : "#000"
    },
    headlineStyle: {
      fontSize: "32px",
      lineHeight: "48px",
      color:
        sampleTextColor && sampleTextColor !== "" ? sampleTextColor : "#000"
    },
    subtitle: {
      fontSize: "24px",
      lineHeight: "32px",
      color:
        sampleTextColor && sampleTextColor !== "" ? sampleTextColor : "#000"
    }
  };

  const [blackContrastRatio, setBlackContrastRatio] = useState();
  const [whiteContrastRatio, setWhiteContrastRatio] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    let rgb = hexToRgb(hexValue);
    setRgbValue(rgb);

    let lumin = getLuminance(rgb.red, rgb.green, rgb.blue);
    setLuminance(lumin);

    let blackLumin = getLuminance(65, 65, 65);
    let whiteLumn = getLuminance(255, 255, 255);

    console.log(blackLumin, whiteLumn);

    const whiteContrast =
      lumin > whiteLumn
        ? (whiteLumn + 0.05) / (lumin + 0.05)
        : (lumin + 0.05) / (whiteLumn + 0.05);

    const blackContrast =
      lumin > blackLumin
        ? (blackLumin + 0.05) / (lumin + 0.05)
        : (lumin + 0.05) / (blackLumin + 0.05);

    setWhiteContrastRatio(whiteContrast);
    setBlackContrastRatio(blackContrast);
    let white = whiteContrast < 1 / 3;
    let black = blackContrast < 1 / 3;

    console.log(white ? "Pass" : "Fail");

    console.log(black ? "Pass" : "Fail");

    if (white && !black) {
      setSampleTextColor("rgb(255,255,255)");
      console.log("rgb(255,255,255)");
    } else if (black && !white) {
      setSampleTextColor("rgb(65,65,65)");
    } else if (whiteContrast > blackContrast) {
      setSampleTextColor("rgb(255,255,255)");
    } else {
      setSampleTextColor("rgb(65,65,65)");
    }
  };

  useEffect(() => {
    console.log(hexValue);
  }, [hexValue]);

  return (
    <div style={styles.main}>
      <div style={styles.mainContainer}>
        <div>
          <p style={styles.headlineText}>Color Contrast Calculator</p>
          <p style={styles.defaultText}>
            Use this tool to calculate contrast and find good variations of
            colors that meet WGAC standards.
          </p>
        </div>
        <div style={styles.primaryContent}>
          <div style={styles.inputGroup}>
            <div>
              <label style={styles.inputLabel}>Color Hex</label>
            </div>
            <div>
              <input
                placeholder={"Hex Color"}
                onInput={(e) => {
                  setHexValue(e.target.value);
                }}
                value={hexValue}
                onFocus={() => setColorFocus(true)}
                onBlur={() => setColorFocus(false)}
                style={colorFocus ? styles.focusInput : styles.textInput}
              />
            </div>
            <div>
              <div style={styles.rgbValues}>
                <div style={styles.rgbColorName}>
                  <p>Red:</p>
                </div>
                <div style={styles.rgbColorValue}>
                  <p>{rgbValue.red}</p>
                </div>
              </div>
              <div style={styles.rgbValues}>
                <div style={styles.rgbColorName}>
                  <p>Green:</p>
                </div>
                <div style={styles.rgbColorValue}>
                  <p>{rgbValue.green}</p>
                </div>
              </div>
              <div style={styles.rgbValues}>
                <div style={styles.rgbColorName}>
                  <p>Blue:</p>
                </div>
                <div style={styles.rgbColorValue}>
                  <p>{rgbValue.blue}</p>
                </div>
              </div>
              <div style={styles.rgbValues}>
                <div style={styles.rgbColorName}>
                  <p>Luminance:</p>
                </div>
                <div style={styles.rgbColorValue}>
                  <p>{parseFloat(luminance).toFixed(2)}</p>
                </div>
              </div>
              <div style={styles.rgbValues}>
                <div style={styles.rgbColorName}>
                  <p>White Contrast Ratio:</p>
                </div>
                <div style={styles.rgbColorValue}>
                  <p>{parseFloat(whiteContrastRatio).toFixed(2)}</p>
                </div>
              </div>
              <div style={styles.rgbValues}>
                <div style={styles.rgbColorName}>
                  <p>Black Contrast Ratio:</p>
                </div>
                <div style={styles.rgbColorValue}>
                  <p>{parseFloat(blackContrastRatio).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
          <div style={calculatedStyles.sampleBlock}>
            <h1 style={calculatedStyles.headlineStyle}>Sample Headline</h1>
            <h2 style={calculatedStyles.subtitle}>Sample Subtitle</h2>
          </div>
        </div>
        <div style={styles.buttonArea}>
          <button
            type="button"
            onClick={(e) => handleClick(e)}
            style={styles.defaultButton}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
