import React, { useMemo, useState } from "react";
import {
    FlatList,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { bridgeStorage, sendActiveFloorToBridge } from "wovvmap-webview-bridge";



type Floor = {
  index: number;
  FloorName: string;
  ShortName?: string;
};

export default function FloorSelector() {
  const [showDropdown, setShowDropdown] = useState(false);

  // assuming your bridgeStorage.signal<T>() returns [value, setter]
  const [activeFloor, setActiveFloor] = bridgeStorage.signal("activeFloor");
  const [floorList] = bridgeStorage.signal("floorImages");

  const active = useMemo(
    () => floorList?.find(f => f.index === activeFloor),
    [floorList, activeFloor]
  );

  const toggleDropdown = () => setShowDropdown(v => !v);

  const handleSelect = (floor: Floor) => {
    sendActiveFloorToBridge(floor.index);
    setActiveFloor(floor.index);
    setShowDropdown(false);
  };

  return (
    <View pointerEvents="box-none" style={styles.root}>
      <TouchableOpacity
        onPress={toggleDropdown}
        activeOpacity={0.8}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {active?.ShortName || active?.FloorName || "Select Floor"}
        </Text>
        <Text style={styles.chev}>{showDropdown ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      <Modal
        visible={!!showDropdown}
        animationType="fade"
        transparent
        onRequestClose={() => setShowDropdown(false)}
      >
        {/* backdrop to close on outside press */}
        <Pressable style={styles.backdrop} onPress={() => setShowDropdown(false)} />

        {/* dropdown panel (anchored near the button) */}
        <View style={styles.dropdownContainer} pointerEvents="box-none">
          <View style={styles.dropdown}>
            <FlatList
              data={floorList || []}
              keyExtractor={(item) => String(item.index)}
              renderItem={({ item }) => {
                const selected = activeFloor === item.index;
                return (
                  <Pressable
                    onPress={() => handleSelect(item)}
                    style={({ pressed }) => [
                      styles.row,
                      selected && styles.rowSelected,
                      pressed && styles.rowPressed,
                    ]}
                  >
                    <Text
                      style={[styles.rowText, selected && styles.rowTextSelected]}
                      numberOfLines={1}
                    >
                      {item.FloorName}
                    </Text>
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    right: 8,
    top: 54,
    zIndex: 10,
    // tweak for tablets / larger screens if you want
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 5, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 6 },
    }),
  },
  buttonText: {
    color: "#000",
    fontWeight: "600",
  },
  chev: {
    color: "#000",
    fontSize: 12,
    marginLeft: 2,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  dropdownContainer: {
    position: "absolute",
    right: 8,
    top: 54 + 44, // 44 ~= button height; adjust if you change button size
  },
  dropdown: {
    width: 220,
    maxHeight: 320,
    backgroundColor: "#FFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    overflow: "hidden",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 5, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 8 },
    }),
  },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
  },
  rowPressed: {
    backgroundColor: "#F5F5F5",
  },
  rowSelected: {
    backgroundColor: "#F0F6FF",
  },
  rowText: {
    color: "#111",
  },
  rowTextSelected: {
    fontWeight: "700",
  },
});
