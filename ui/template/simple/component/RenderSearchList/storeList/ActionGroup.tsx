import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NodePoint } from "wovvmap-webview-bridge";
import { handleToDirectionClick } from "../../../helper/uiService";
import { uiStore } from "../../../store/simpleUiStore";
import ActionButton from "./ActionButton";

type Props = {
  active?: boolean;
  nodePoint: NodePoint;
};

export const ActionGroup: React.FC<Props> = ({ nodePoint }) => {
  return (
    <View style={styles.wrap}>
      <ActionButton
        label="Directions"
        active
        icon={<Ionicons name="navigate" size={16} color="#fff" />}
        onPress={() => {
          uiStore.set("showDirectionModal", true);
          handleToDirectionClick(nodePoint);
        }}
      />
      <ActionButton
        label="Add to Favourite"
        icon={<Ionicons name="heart-outline" size={16} color="#111" />}
        onPress={() => console.log("Favourite clicked")}
      />
      <ActionButton
        label="Call"
        icon={<Ionicons name="call" size={16} color="#111" />}
        onPress={() => console.log("Call clicked")}
      />
      <ActionButton
        label="Share"
        icon={<Feather name="share-2" size={16} color="#111" />}
        onPress={() => console.log("Share clicked")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
});

export default ActionGroup;
