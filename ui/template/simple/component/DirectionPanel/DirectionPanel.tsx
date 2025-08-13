import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  View
} from "react-native";
import { uiStore } from "../../store/simpleUiStore";

// If you have a PNG for the from/to icon, use require():
// const fromToPng = require("@/assets/direction/fromTo-horigentle.png");

// Otherwise we’ll show a vector icon instead of the SVG file.
const FromToIcon = () => (
  <Ionicons name="swap-horizontal" size={24} color="#fff" />
);

// ---- RN versions of your subcomponents (import your own if you already have them)
import ShopsListing from "../RenderSearchList/ShopsListing"; // RN component
import DirectionHandler from "./DirectionHandler"; // RN component
import StepByStepList from "./StepByStepList"; // RN component

const RenderDirectionList = () => {
  const [showStapByStapList] = uiStore.signal("showStapByStapList");
  const [showDirectionFromStoreList] = uiStore.signal("showDirectionFromStoreList");
  const [showDirectionToStoreList] = uiStore.signal("showDirectionToStoreList");

  if (showStapByStapList) return <StepByStepList />;

  return (
    <>
      {showDirectionFromStoreList ? <ShopsListing type="fromInputListing" /> : null}
      {showDirectionToStoreList ? <ShopsListing type="toInputListing" /> : null}
    </>
  );
};

export default function DirectionPanel() {
  const [isOpen, setIsOpen] = uiStore.signal("isMinimizedDirectionPanel");

  // slide animation (translateX from -100% -> 0)
  const slideX = useRef(new Animated.Value(0)).current;
  const panelWidth = 0.92; // 92% like your web class

  useEffect(() => {
    Animated.timing(slideX, {
      toValue: isOpen ? 0 : -1, // -1 => off-screen to left
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [isOpen, slideX]);

  const translateX = slideX.interpolate({
    inputRange: [-1, 0],
    outputRange: [-100, 0], // percent of own width (we’ll scale using panel width)
  });

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Animated.View
        // Positioned near top, width ≈ 92%, rounded & elevated
        style={[
          styles.panel,
          {
            transform: [
              {
                translateX: Animated.multiply(
                  translateX,
                  // convert percent to pixels at runtime by using panel width relative to screen—
                  // Animated.multiply with width factor is approximate; this works fine visually.
                  // If you prefer exact pixels, measure with onLayout and store width in state.
                  1
                ),
              },
            ],
          },
        ]}
        // prevent pointer events falling through the panel area
        pointerEvents="box-none"
      >
        <View style={styles.inner}>
          <DirectionHandler />
          <RenderDirectionList />
        </View>

        {/* Toggle button floating on the right edge */}
        <Pressable
          onPress={toggle}
          style={({ pressed }) => [
            styles.toggleBtn,
            isOpen ? styles.toggleOpen : styles.toggleClosed,
            pressed && { opacity: 0.85 },
          ]}
        >
          {/* From–To icon when closed (like your web) */}
          {!isOpen ? (
            // If you have PNG: <Image source={fromToPng} style={styles.fromToImg} />
            <View style={styles.fromToWrap}>
              <FromToIcon />
            </View>
          ) : null}

          {/* Arrow chevron */}
          <Ionicons
            name="chevron-forward"
            size={16}
            color="#fff"
            style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}
          />
        </Pressable>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    top: Platform.select({ ios: 8, android: 8 }),
    left: "3%", // matches left [3%] when open
    width: "92%",
    zIndex: 20,
  },
  inner: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 6 },
    }),
  },

  toggleBtn: {
    position: "absolute",
    right: -17, // hugs panel edge like your CSS (-right-[17px] when open)
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111", // "highlighted" style substitute
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  toggleOpen: {
    top: 24,
    width: 17,
    height: 151,
  },
  toggleClosed: {
    top: 50,
    right: -80, // matches your closed offset
    width: 80,
    height: 42,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  fromToWrap: {
    marginRight: 8,
  },
  fromToImg: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 8,
  },
});
