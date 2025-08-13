// 1) Add this at top (new file or same file)
// SafeImage.tsx
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SvgUri } from "react-native-svg"; // npm i react-native-svg

type Props = {
  uri?: string | null;
  width: number;
  height: number;
  borderRadius?: number;
};

function sanitize(uri?: string | null): string | null {
  if (!uri || typeof uri !== "string") return null;

  let u = uri.trim();

  // scheme-less -> add https
  if (u.startsWith("//")) u = "https:" + u;

  // if it already has data: or http(s): keep it
  if (u.startsWith("data:")) return u;

  // encode only unsafe chars (spaces etc.)
  try {
    // If malformed, new URL will throw
    const parsed = new URL(u, "https://dummy-base.invalid");
    // If relative path was given, parsed.origin will be dummy; treat as invalid
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      // re-compose with encodeURI for path/query
      return encodeURI(u);
    }
    return null;
  } catch {
    // last attempt: encode and hope for the best
    try {
      return encodeURI(u);
    } catch {
      return null;
    }
  }
}

export const SafeImage: React.FC<Props> = ({ uri, width, height, borderRadius }) => {
  const clean = sanitize(uri);
  const isSvg = !!clean && /\.svg(\?|$)/i.test(clean);

  if (!clean) {
    return (
      <View style={[styles.fallback, { width, height, borderRadius }]}>
        <Text style={styles.fallbackText}>Logo</Text>
      </View>
    );
  }

  if (isSvg) {
    // Remote SVG needs react-native-svg
    return (
      <SvgUri
        uri={clean}
        width={width}
        height={height}
        // fallback on error
        onError={() => {}}
      />
    );
  }

  return (
    <Image
      source={{ uri: clean }}
      style={{ width, height, borderRadius }}
      resizeMode="contain"
      onError={() => {}}
    />
  );
};

const styles = StyleSheet.create({
  fallback: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEE",
    borderWidth: 1,
    borderColor: "#BBB",
  },
  fallbackText: { color: "#888", fontSize: 10 },
});
