// RenderStoreList.native.tsx
import React, { useMemo } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import { uiStore } from "../../../store/simpleUiStore";
import BottomSheet from "../../BottomSheet/BottomSheet";
import { ActionGroup } from "./ActionGroup";
import { SafeImage } from "./ImageSafe";



// ---- Helpers ----
const ordinal = (n?: number) => {
  if (n == null) return "";
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
};

const RenderStars = (rating = 0) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const items = Array.from({ length: 5 }).map((_, i) => {
    const isFull = i < full;
    const isHalf = !isFull && half && i === full;
    const char = isFull ? "★" : isHalf ? "☆" : "☆";
    return (
      <Text key={i} style={[styles.star, isFull && styles.starFull]}>
        {char}
      </Text>
    );
  });
  return <View style={{ flexDirection: "row" }}>{items}</View>;
};


function StoresList() {
  const [toInputListing] = uiStore.signal("toInputListing");

  const data = useMemo(() => toInputListing ?? [], [toInputListing]);

  if (!data?.length) {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>No matching stores found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(_, i) => String(i)}
      contentContainerStyle={{ paddingBottom: 12 }}
      renderItem={({ item }) => {
        const { logo, LocationName, z } = item;
        return (
          <View style={styles.card}>
            {/* Top: Logo + Name + Floor */}
            <View style={styles.topRow}>
              <View style={styles.logoBox}>
                {logo?.url || logo?.url?.trim().length > 0 ? (
                  <SafeImage
                    uri={logo?.url}           // <-- was Image with raw uri
                    width={60}
                    height={33}
                    borderRadius={8}
                  />
                ) : (
                  <View style={styles.logoFallback}>
                    <Text style={{ color: "#888" }}>Logo</Text>
                  </View>
                )}
              </View>
              <View style={styles.titleCol}>
                <Text numberOfLines={1} style={styles.storeName}>
                  {LocationName?.text ?? "Store"}
                </Text>
                <Text style={styles.floorText}>
                  {ordinal(z)} Floor
                </Text>
              </View>
            </View>

            {/* Status + Time + Rating */}
            <View style={styles.statusRow}>
              <Text style={styles.openTxt}>Open</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.timeTxt}>Closes 9:30 pm</Text>
              <View style={styles.ratingWrap}>
                <Text style={styles.ratingValue}>4.5</Text>
                {RenderStars(4.5)}
              </View>
            </View>

            {/* Buttons */}
            <ActionGroup nodePoint={item} />

            {/* Image Gallery (horizontal) */}
            <FlatList
              data={[
                "https://newwovvmapfrontend.vercel.app/assets/image1-ChcZVLNi.png",
                "https://newwovvmapfrontend.vercel.app/assets/image2-CTImOZPw.png",
                "https://newwovvmapfrontend.vercel.app/assets/image1-ChcZVLNi.png",
              ]}
              keyExtractor={(_, i) => String(i)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
              renderItem={({ item: img }) => (
                <View style={styles.galleryItem}>
                  <Image source={{ uri: img }} style={styles.galleryImg} />
                </View>
              )}
            />
          </View>
        );
      }}
      // approx height of one item to help perf (your web used 335)
      getItemLayout={(_, index) => ({ length: 335, offset: 335 * index, index })}
    />
  );
}

export default function RenderStoreList() {
  const [initialHeight] = uiStore.signal("bottomSheetHeight");
  // 👇 Mobile-only: no useIsMobile gate — always renders in the bottom sheet
  return (
    <BottomSheet initialHeight={initialHeight}>
       <StoresList /> 
    </BottomSheet>
  );
}

// ---------- styles ----------
const styles = StyleSheet.create({
  emptyBox: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  emptyText: {
    color: "#6b7280", // gray-500
    fontSize: 14,
  },

  card: {
    paddingHorizontal: 26,
    paddingVertical: 23,
    borderTopWidth: 2,
    borderTopColor: "#D9D9D9",
    backgroundColor: "#FFF",
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    columnGap: 10,
  },
  logoBox: {
    width: 60,
    height: 33,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 11,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  logoFallback: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleCol: {
    justifyContent: "center",
    gap: 4,
    height: 33,
    flex: 1,
  },
  storeName: { fontSize: 14, color: "#111" },
  floorText: { fontSize: 12, color: "#111" },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  openTxt: { color: "#16a34a", fontWeight: "700" }, // green-600
  dot: { color: "#16a34a" },
  timeTxt: { color: "#6b7280" }, // gray-500
  ratingWrap: { flexDirection: "row", alignItems: "center", columnGap: 7, marginLeft: 8 },
  ratingValue: { fontWeight: "700", fontSize: 14, marginRight: 2 },
  star: { fontSize: 14, color: "#9CA3AF", marginLeft: 1 },
  starFull: { color: "#111" },

  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  btn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#111",
  },
  btnPressed: { opacity: 0.8 },
  btnText: { color: "#FFF", fontWeight: "600" },

  galleryItem: {
    width: 163,
    height: 165,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#EEE",
  },
  galleryImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
