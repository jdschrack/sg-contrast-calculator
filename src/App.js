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
  const [blackContrastRatio, setBlackContrastRatio] = useState();
  const [whiteContrastRatio, setWhiteContrastRatio] = useState();

  const styles = {
    ...CommonStyles,
    main: {
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      margin: "16px"
    },
    mainContainer: {
      maxWidth: "900px",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      boxShadow:
        "0px 6px 30px rgba(0, 0, 0, 0.08), 0px 1px 6px rgba(0, 0, 0, 0.04)",
      borderRadius: "16px",
      padding: "0 32px 24px 32px"
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
      borderBottomColor: "#E5E5E5",
      borderBottomStyle: "solid",
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    infoBlock: {
      paddingRight: "8px"
    },
    rgbColorValue: {
      display: "flex",
      flex: "auto",
      fontSize: "18px",
      fontWeight: "800",
      justifyContent: "flex-end"
    }
  };

  const calculatedStyles = {
    defaultButton: {
      backgroundColor: "#0558A7",
      borderRadius: "8px",
      flex: "none",
      alignSelf: "center",
      flexGrow: 0,
      margin: "12px 0px",
      color: "#fff",
      padding: "16px 32px",
      fontSize: "16px",
      fontWeight: "600",
      lineHieght: "24px",
      borderCollapse: "collapse",
      borderColor: "transparent"
    },
    bodyText: {
      fontSize: "16px",
      lineHeight: "24px",
      color:
        sampleTextColor && sampleTextColor !== "" ? sampleTextColor : "#000"
    },
    sampleBlockOverlay: {
      background:
        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 50%)",
      backgroundBlendMode: "overlay"
    },
    sampleBlock: {
      display: "flex",
      flexDirection: "column",
      alignSelf: "flex-start",
      borderRadius: "16px",
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
  const handleClick = (e) => {
    e.preventDefault();
    let rgb = hexToRgb(hexValue);

    setRgbValue(rgb);

    let lumin = getLuminance(rgb.red, rgb.green, rgb.blue);
    setLuminance(lumin);

    let blackLumin = getLuminance(65, 65, 65);
    let whiteLumn = getLuminance(255, 255, 255);

    const whiteContrast =
      lumin > whiteLumn
        ? (lumin + 0.05) / (whiteLumn + 0.05)
        : (whiteLumn + 0.05) / (lumin + 0.05);

    console.log(whiteContrast);

    let blackValue = "rgb(65,65,65)";
    let blackContrast =
      lumin > blackLumin
        ? (lumin + 0.05) / (blackLumin + 0.05)
        : (blackLumin + 0.05) / (lumin + 0.05);

    if (whiteContrast < blackContrast && blackContrast < 3.5) {
      blackLumin = getLuminance(17, 17, 17);

      blackContrast =
        lumin > blackLumin
          ? (lumin + 0.05) / (blackLumin + 0.05)
          : (blackLumin + 0.05) / (lumin + 0.05);

      blackValue = "rgb(17, 17, 17)";
    }
    console.log(blackContrast);

    setWhiteContrastRatio(whiteContrast);
    setBlackContrastRatio(blackContrast);
    let white = whiteContrast < 1 / 3;
    let black = blackContrast < 1 / 3;

    if (white && !black) {
      setSampleTextColor("rgb(255,255,255)");
    } else if (black && !white) {
      setSampleTextColor(blackValue);
    } else if (whiteContrast > blackContrast) {
      setSampleTextColor("rgb(255,255,255)");
    } else {
      setSampleTextColor(blackValue);
    }
  };

  useEffect(() => {}, [hexValue]);

  return (
    <div style={styles.main}>
      <div style={styles.mainContainer}>
        <div>
          <p style={styles.headlineText}>Color Contrast Calculator</p>
          <p style={styles.defaultText}>
            Use this tool to calculate contrast and find good text colors that
            meet WCAG standards. For more information visit{" "}
            <a href="https://www.w3.org/WAI/standards-guidelines/wcag/">WGAC</a>
            {"."}
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
            <div style={styles.infoBlock}>
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
                  <p>
                    {!luminance ||
                    luminance === "" ||
                    parseFloat(luminance) === "NaN"
                      ? ""
                      : parseFloat(luminance).toFixed(2)}
                  </p>
                </div>
              </div>
              <div style={styles.rgbValues}>
                <div style={styles.rgbColorName}>
                  <p>White Contrast Ratio:</p>
                </div>
                <div style={styles.rgbColorValue}>
                  <p>
                    {!whiteContrastRatio ||
                    whiteContrastRatio === "" ||
                    parseFloat(whiteContrastRatio) === "NaN"
                      ? ""
                      : parseFloat(whiteContrastRatio).toFixed(2)}
                  </p>
                </div>
              </div>
              <div style={styles.rgbValues}>
                <div style={styles.rgbColorName}>
                  <p>Black Contrast Ratio:</p>
                </div>
                <div style={styles.rgbColorValue}>
                  <p>
                    {!blackContrastRatio ||
                    blackContrastRatio === "" ||
                    parseFloat(blackContrastRatio) === "NaN"
                      ? ""
                      : parseFloat(blackContrastRatio).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={calculatedStyles.sampleBlock}>
            <h1 style={calculatedStyles.headlineStyle}>Sample Headline</h1>
            <h2 style={calculatedStyles.subtitle}>Sample Subtitle</h2>
            <p style={calculatedStyles.bodyText}>
              Bacon ipsum dolor amet frankfurter pork cupim boudin, burgdoggen
              pork belly bresaola. Pancetta doner cow, tongue rump beef ribs
              jerky prosciutto pastrami. Tail prosciutto flank drumstick
              burgdoggen frankfurter. Meatloaf shoulder picanha beef turducken
              capicola ball tip shankle jerky bresaola short ribs sausage.
              Meatball spare ribs pastrami, landjaeger brisket shank jerky.
              Turkey kevin filet mignon tri-tip ham tenderloin sirloin cow short
              loin. Cupim rump beef ribs, ribeye strip steak fatback kielbasa
              short loin boudin tail prosciutto porchetta swine sausage.
            </p>
          </div>
        </div>
        <div style={styles.buttonArea}>
          <button
            disabled={!hexValue || hexValue === ""}
            type="button"
            onClick={(e) => handleClick(e)}
            style={calculatedStyles.defaultButton}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
