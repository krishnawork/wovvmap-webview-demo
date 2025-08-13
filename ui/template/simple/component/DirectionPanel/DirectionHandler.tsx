import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { handleDirectionBack } from "../../helper/uiService";

// ✅ RN versions you already have from earlier steps
import { RenderFromSearchInput, RenderToSearchInput } from "../SearchPanel/SearchPannel";
import DirectionButton from "./DirectionButton"; // make sure this is RN
import DirectionFilter from "./DirectionFilter"; // make sure this is RN

// If you export a PNG for the vertical from-to svg, uncomment this:
// const fromToPng = require("@/assets/direction/fromTo-horigentle.png");

const DirectionHandler = () => {
  return (
    <View style={styles.card}>
      {/* Back row */}
      <View style={styles.headerRow}>
        <Pressable
          onPress={handleDirectionBack}
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.65 }]}
        >
          <Ionicons name="chevron-back" size={18} color="#000" />
        </Pressable>
        <Text style={styles.title}>Direction</Text>
      </View>

      {/* Inputs + vertical from-to icon */}
      <View style={styles.inputsWrap}>
        {/* Option A: use PNG exported from the SVG */}
        {/* <Image source={fromToPng} style={styles.fromToImg} /> */}

        {/* Option B: vector fallback (swap-vertical) */}
        <View style={styles.fromToIconFallback}>
          <Ionicons name="swap-vertical" size={22} color="#111" />
        </View>

        <View style={styles.inputsCol}>
          <RenderFromSearchInput />
          <View style={{ height: 8 }} />
          <RenderToSearchInput />
        </View>
      </View>

      {/* Filters */}
      <DirectionFilter />

      {/* CTA */}
      <View style={styles.ctaWrap}>
        <DirectionButton />
      </View>
    </View>
  );
};

export default DirectionHandler;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#FFF",
    position: "relative",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
      },
      android: { elevation: 2 },
    }),
    width:"100%"
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  backBtn: {
    padding: 6,
    marginRight: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },

  inputsWrap: {
    flexDirection: "row",
    position: "relative",
  },
  // If using PNG: absolute image sized like your web: h-[70px]
  fromToImg: {
    position: "absolute",
    left: 8,
    width: 20,
    height: 70,
    resizeMode: "contain",
  },
  // Vector fallback placed similarly
  fromToIconFallback: {
    position: "absolute",
    left: 8,
    height: 70,
    justifyContent: "center",
  },

  inputsCol: {
    paddingLeft: 40, // space for the vertical icon
    flex: 1,
  },

  ctaWrap: {
    marginTop: 19,
    alignItems: "center",
    justifyContent: "center",
    width:"100%"
  },
});
