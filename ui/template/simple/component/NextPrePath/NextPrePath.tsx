import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { bridgeStorage, sendPathFinishBtnClick, sendPathNextBtnClick, sendPathPreBtnClick } from "wovvmap-webview-bridge";

export default function NextPrePath() {
  const [nextPreState] = bridgeStorage.signal("nextPreState");

  if (!nextPreState || !nextPreState.hasPath) return null;

  const { canPrev, canNext, isLastStep } = nextPreState;

  return (
    <View pointerEvents="box-none" style={styles.wrap}>
      {/* Previous */}
      <Pressable
        onPress={sendPathPreBtnClick}
        disabled={!canPrev}
        style={({ pressed }) => [
          styles.btn,
          !canPrev && styles.btnDisabled,
          pressed && canPrev && styles.btnPressed,
        ]}
      >
        <Text style={styles.btnText}>Previous Step</Text>
      </Pressable>

      {/* Next / Finish */}
      {isLastStep ? (
        <Pressable
          onPress={sendPathFinishBtnClick}
          style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        >
          <Text style={styles.btnText}>Finish</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={sendPathNextBtnClick}
          disabled={!canNext}
          style={({ pressed }) => [
            styles.btn,
            !canNext && styles.btnDisabled,
            pressed && canNext && styles.btnPressed,
          ]}
        >
          <Text style={styles.btnText}>Next Step</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: "4.5%",
    right: "4.5%",
    bottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    zIndex: 20,
  },
  btn: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#F73378",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 6 },
    }),
  },
  btnPressed: { opacity: 0.9 },
  btnDisabled: {
    backgroundColor: "#9E9E9E",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
