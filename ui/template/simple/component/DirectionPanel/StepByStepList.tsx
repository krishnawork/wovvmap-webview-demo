import {
    Ionicons, // for map markers, arrows
    MaterialCommunityIcons, // for elevator/escalator
    MaterialIcons, // for exit-to-app
} from "@expo/vector-icons";
import React, { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { bridgeStorage } from "wovvmap-webview-bridge";

type StepIconKey =
  | "left"
  | "right"
  | "startPoint"
  | "endPoint"
  | "Take Elevator"
  | "Take Escalator"
  | "Exit Elevator"
  | "Exit Escalator";

// const Icon = ({ name }: { name?: StepIconKey | null }) => {
//   if (!name) return null;
//   switch (name) {
//     case "left":
//       return <Ionicons name="arrow-back" size={16} color="#111" />;
//     case "right":
//       return <Ionicons name="arrow-forward" size={16} color="#111" />;
//     case "startPoint":
//       return <Ionicons name="location" size={16} color="green" />;
//     case "endPoint":
//       return <Ionicons name="location" size={16} color="red" />;
//     case "Take Elevator":
//       return <MaterialCommunityIcons name="elevator" size={18} color="#111" />;
//     case "Take Escalator":
//       return <MaterialCommunityIcons name="escalator-up" size={18} color="#111" />;
//     case "Exit Elevator":
//     case "Exit Escalator":
//       return <MaterialIcons name="exit-to-app" size={18} color="#111" />;
//     default:
//       return null;
//   }
// };
// sign-direction-left
// sign-direction-right

const Icon = ({ name }: { name?: StepIconKey | null }) => {
  if (!name) return null;

  switch (name) {
    case "left":
      // or: "chevron-back"
      return <Ionicons name="arrow-back" size={18} color="#111" />;
    case "right":
      // or: "chevron-forward"
      return <Ionicons name="arrow-forward" size={18} color="#111" />;

    case "startPoint":
      // or: "location-outline" / "location"
      return <Ionicons name="location-sharp" size={18} color="green" />;
    case "endPoint":
      return <Ionicons name="location-sharp" size={18} color="red" />;

    case "Take Elevator":
      return <MaterialCommunityIcons name="elevator" size={18} color="#111" />;
    case "Take Escalator":
      // alternatives: "escalator", "escalator-up"
      return <MaterialCommunityIcons name="escalator-up" size={18} color="#111" />;
    case "Exit Elevator":
    case "Exit Escalator":
      return <MaterialIcons name="exit-to-app" size={18} color="#111" />;
    default:
      return null;
  }
};

export default function StepByStepList() {
  const [stapByStapList] = bridgeStorage.signal("stapByStapList");
  const data = useMemo(() => stapByStapList ?? [], [stapByStapList]);

  if (!data.length) return null;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item, index }) => {
          const isLast = index === data.length - 1;
          return (
            <View
              style={[
                styles.row,
                !isLast && styles.rowDivider,
                isLast && styles.lastRowBg,
              ]}
            >
              <View style={{ paddingTop: 2 }}>
                <Icon name={item.icon as StepIconKey} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.instruction}>{item.instruction}</Text>
                <Text style={styles.meta}>
                  {item.distance}
                  {` - approx step: ${item.steps}`}
                </Text>
              </View>
            </View>
          );
        }}
        // keeps height capped like your web max-h-[276px]
        style={{ maxHeight: 276 }}
        contentContainerStyle={{ paddingTop: 19 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: "#FFF",
    // shadow-[0px_1px_2px_rgba(0,0,0,0.25)]
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e3b9c5",
  },
  lastRowBg: {
    backgroundColor: "#FFDBEC",
  },
  instruction: {
    fontSize: 12,
    color: "#000",
  },
  meta: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000",
  },
});
