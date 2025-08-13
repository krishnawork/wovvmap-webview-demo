// StepByStepToggle.native.tsx
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { uiStore } from "../../store/simpleUiStore";

export default function StepByStepToggle() {
  const [showStapByStapList, setShowStapByStapList] =
    uiStore.signal("showStapByStapList");

  const onPress = () => {
    setShowStapByStapList(!showStapByStapList);
  };

  return (
    <Pressable
      onPress={onPress}
      // RN doesn't need stopPropagation like the web button here
      style={styles.button}
      accessibilityRole="button"
      accessibilityLabel="Toggle step by step directions"
      accessibilityState={{ expanded: !!showStapByStapList }}
    >
      <View style={styles.left}>
        <Text style={styles.clipboard}>📋</Text>
        <Text style={styles.label}>Step by step directions</Text>
        <Text style={styles.chevron}>
          {showStapByStapList ? "⌃" : "⌄"}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#FAD3E5",
    paddingHorizontal: 16, // px-4
    paddingVertical: 12,   // py-3
    borderBottomLeftRadius: 16, // ~rounded-b-2xl
    borderBottomRightRadius: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  clipboard: {
    fontSize: 12, // approx w-[10px] icon size
    marginRight: 6, // gap-1.5
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  chevron: {
    fontSize: 16,
    marginLeft: 6,
  },
});
