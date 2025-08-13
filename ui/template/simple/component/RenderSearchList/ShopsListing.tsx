// ShopsListing.native.tsx
import React, { useMemo } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { NodePoint } from "wovvmap-webview-bridge";
import { handleFromDirectionClick, handleToDirectionClick } from "../../helper/uiService";
import { uiStore } from "../../store/simpleUiStore";

type ShopsListingProps = {
  type: "fromInputListing" | "toInputListing";
  style?: ViewStyle;
};



const ROW_HEIGHT = 45;

const EmptyState = () => (
  <View style={styles.emptyBox}>
    <Text style={styles.emptyText}>No matching stores found.</Text>
  </View>
);

const Row = ({
  nodePoint,
  onPress,
}: {
  nodePoint: NodePoint;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.row,
      pressed && { backgroundColor: "#F7F7F7" },
    ]}
  >
    <View style={styles.logoBox}>
      {nodePoint?.logo?.url ? (
        <Image
          source={{ uri: nodePoint.logo.url }}
          style={styles.logoImg}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.logoFallback}>
          <Text style={{ color: "#888", fontSize: 10 }}>Logo</Text>
        </View>
      )}
    </View>

    <Text numberOfLines={1} style={styles.title}>
      {nodePoint?.LocationName?.text ?? "Store"}
    </Text>
  </Pressable>
);

const ShopsListing: React.FC<ShopsListingProps> = ({ type, style }) => {
  const [shopsListing] = uiStore.signal(type);
  const data = useMemo(() => shopsListing ?? [], [shopsListing]);

  const onItemPress = (item: NodePoint) => {
    if (type === "fromInputListing") {
      handleFromDirectionClick(item as any);
    } else {
      handleToDirectionClick(item as any);
    }
  };

  if (!data.length) {
    return (
      <View style={[styles.container, style]}>
        <EmptyState />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={data}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <Row nodePoint={item} onPress={() => onItemPress(item)} />
        )}
        // approx height per row (matches your 45)
        getItemLayout={(_, index) => ({
          length: ROW_HEIGHT,
          offset: ROW_HEIGHT * index,
          index,
        })}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default ShopsListing;

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: "#FFF",
    // shadow to mimic: shadow-[0px_1px_2px_rgba(0,0,0,0.25)]
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    maxHeight: 276, // matches your web max
    paddingTop: 19,
    paddingBottom: 4,
    overflow: "hidden",
  },
  listContent: {
    paddingBottom: 4,
  },
  emptyBox: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  emptyText: {
    color: "#6b7280",
    fontSize: 14,
  },
  row: {
    height: ROW_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EAEAEA",
  },
  logoBox: {
    width: 42,
    height: 27,
    borderWidth: 1,
    borderColor: "#BBBBBB",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logoImg: {
    width: 42,
    height: 27,
  },
  logoFallback: {
    width: 42,
    height: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    flexShrink: 1,
  },
});
