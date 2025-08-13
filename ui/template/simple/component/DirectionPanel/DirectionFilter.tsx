// DirectionFilter.native.tsx
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { bridgeStorage } from "wovvmap-webview-bridge"; // same store hook as web

export default function DirectionFilter() {
  const [elevator, setElevator] = bridgeStorage.signal("elevator");
  const [escalator, setEscalator] = bridgeStorage.signal("escalator");

  useEffect(() => {
    setElevator("true");   // default on mount
    setEscalator("false");
  }, []);

  const toggle = (key: "elevator" | "escalator") => {
    const isElevator = key === "elevator";
    const isOn = isElevator ? elevator === "true" : escalator === "true";

    if (isElevator) {
      setElevator(isOn ? "false" : "true");
      setEscalator("false");
    } else {
      setEscalator(isOn ? "false" : "true");
      setElevator("false");
    }
  };

  const CustomCheckbox = ({ checked }: { checked: boolean }) => (
    <View
      style={[
        styles.checkbox,
        checked ? styles.checkboxChecked : styles.checkboxUnchecked,
      ]}
    >
      {checked ? <Text style={styles.checkmark}>✓</Text> : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.item}
        onPress={() => toggle("elevator")}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: elevator === "true" }}
      >
        <CustomCheckbox checked={elevator === "true"} />
        <Text style={styles.label}>Elevator</Text>
      </Pressable>

      <Pressable
        style={styles.item}
        onPress={() => toggle("escalator")}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: escalator === "true" }}
      >
        <CustomCheckbox checked={escalator === "true"} />
        <Text style={styles.label}>Escalator</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingLeft: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 16, // RN >=0.71; if not supported, remove and use marginRight on .item
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#9CA3AF", // gray-400
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxUnchecked: {
    backgroundColor: "#FFFFFF",
  },
  checkboxChecked: {
    backgroundColor: "#0FB8F6",
  },
  checkmark: {
    color: "white",
    fontSize: 16,
    lineHeight: 20,
    textAlign: "center",
  },
});
