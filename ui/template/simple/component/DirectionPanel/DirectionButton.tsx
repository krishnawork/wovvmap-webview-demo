// DirectionButton.native.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import DirectionStats from "./DirectionStats";
import StepByStepToggle from "./StepByStepToggle";

type DirectionButtonProps = {};

const DirectionButton: React.FC<DirectionButtonProps> = () => {

  return (
    <View style={styles.wrap}>
      <View style={styles.statsBlock}>
        <DirectionStats />
      </View>

      <View style={styles.bottomBar}>
        <StepByStepToggle />
      </View>
    </View>
  );
};

export default DirectionButton;

const styles = StyleSheet.create({
  // Container that mimics the parent of your fragment (<>...</>)
  // Make sure the parent screen allows absolute positioning (position: 'relative' by default).
  wrap: {
    flex: 1,
    width:"100%"
  },
  // Tailwind "flex flex-col mb-[38px]"
  statsBlock: {
    marginBottom: 38,
  },
  // Tailwind "absolute bottom-0 left-0 w-full"
  bottomBar: {
    width:"100%",
    position: "absolute",
    left: 0,
    bottom: 0,
  },
});
