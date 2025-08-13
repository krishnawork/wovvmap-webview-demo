import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

type Props = {
  label: string;
  icon: React.ReactNode;       // same as web
  onPress?: () => void;        // RN: replaces onClick
  active?: boolean;
  style?: ViewStyle;           // optional extra styling
};

export const ActionButton: React.FC<Props> = ({ label, icon, onPress, active, style }) => {
  const isShare = label === "Share";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isShare ? styles.gapShare : styles.gapDefault,
        active ? styles.active : styles.inactive,
        pressed && { opacity: 0.85 },
        style,
      ]}
    >
      <View style={[styles.iconWrap, active && styles.iconActive]}>{icon}</View>
      <Text style={[styles.text, active ? styles.textActive : styles.textInactive]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,          // rounded-full
    height: 26,
    paddingLeft: 7,
    paddingRight: 12,
    // shadow
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  gapDefault: { columnGap: 3 },
  gapShare: { columnGap: 8 },

  inactive: {
    backgroundColor: "#F6F4F8",
  },
  active: {
    // matches your "highlighted" class intent; adjust to your brand color if needed
    backgroundColor: "#111",
  },

  iconWrap: {
    // if you need consistent icon sizing, you can constrain here
  },
  iconActive: {
    // if your icon doesn’t change color automatically, you can override here
    // e.g. tintColor for Image icons; vector icons accept color prop directly at usage site
  },

  text: {
    fontSize: 12, // text-xs
  },
  textInactive: {
    color: "#2D2D2D",
  },
  textActive: {
    color: "#FFF",
  },
});

export default ActionButton;
