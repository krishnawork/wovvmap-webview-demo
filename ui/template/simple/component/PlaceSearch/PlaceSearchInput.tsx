import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

type SyntheticChange = { target: { value: string } };

interface PlaceSearchInputProps {
  placeholder: string;
  classes?: string; // ignored in RN, kept for compatibility
  value: string;
  onChange: (e: SyntheticChange) => void;
  onFocus: (e: any) => void;
  onBlur?: (e: any) => void;
  onClear?: () => void;
}

export const PlaceSearchInput: React.FC<PlaceSearchInputProps> = ({
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  onClear,
}) => {
  const showClear = useMemo(() => value.length > 0 && !!onClear, [value, onClear]);

  return (
    <View style={styles.wrap}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#888"
        style={styles.input}
        value={value}
        onChangeText={(text) => onChange({ target: { value: text } })}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {showClear ? (
        <Pressable
          onPress={onClear}
          style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.6 }]}
        >
          <Ionicons name="close" size={18} color="#000" />
        </Pressable>
      ) : (
        <View style={styles.iconBtn}>
          <Feather name="search" size={18} color="#000" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 10,
    height: 42,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: "#000",
  },
  iconBtn: {
    paddingHorizontal: 6,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
