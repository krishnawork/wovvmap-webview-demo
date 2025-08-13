// BottomSheet.native.tsx (fix)
import React, { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  Platform,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";

export default function BottomSheet({
  children,
  initialHeight = 30,
  minPercent = 15,
  maxPercent = 85,
  containerProps,
}: {
  children: React.ReactNode;
  initialHeight?: number;
  minPercent?: number;
  maxPercent?: number;
  containerProps?: ViewProps;
}) {
  const screenH = Dimensions.get("window").height;

  const clampPercent = (p: number) =>
    Math.max(minPercent, Math.min(maxPercent, p));
  const toPx = (percent: number) => (clampPercent(percent) / 100) * screenH;

  const startYRef = useRef(0);
  const startHeightPercentRef = useRef(clampPercent(initialHeight));

  // animated value + a plain ref to read current value (without __getValue)
  const heightPx = useRef(new Animated.Value(toPx(initialHeight))).current;
  const heightPxRef = useRef(toPx(initialHeight));

  // keep ref synced with animated value
  useEffect(() => {
    const id = heightPx.addListener(({ value }) => {
      heightPxRef.current = value;
    });
    return () => heightPx.removeListener(id);
  }, [heightPx]);

  // current percent from ref (no private API)
  const getCurrentPercent = () => (heightPxRef.current / screenH) * 100;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (_, gesture) => {
          startYRef.current = gesture.y0;
          startHeightPercentRef.current = clampPercent(getCurrentPercent());
        },
        onPanResponderMove: (_, gesture) => {
          const delta = startYRef.current - gesture.moveY;
          const rawPercent =
            startHeightPercentRef.current + (delta / screenH) * 100;
          heightPx.setValue(toPx(rawPercent)); // buttery drag
        },
        onPanResponderRelease: (_, gesture) => {
          const delta = startYRef.current - gesture.moveY;
          const rawPercent =
            startHeightPercentRef.current + (delta / screenH) * 100;
          Animated.spring(heightPx, {
            toValue: toPx(rawPercent),
            useNativeDriver: false,
            damping: 20,
            stiffness: 180,
          }).start();
        },
      }),
    [screenH]
  );

  return (
    <Animated.View
      style={[styles.sheet, { height: heightPx }]}
      pointerEvents="box-none"
      {...containerProps}
    >
      <View style={styles.handleArea} {...panResponder.panHandlers}>
        <View style={styles.handleBar} />
      </View>
      <View style={styles.content}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    zIndex: 50,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: -4 },
      },
      android: { elevation: 12 },
    }),
  },
  handleArea: {
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff8ec",
  },
  handleBar: { width: 48, height: 6, borderRadius: 999, backgroundColor: "#cfcfcf" },
  content: { flex: 1, paddingHorizontal: 16 },
});
