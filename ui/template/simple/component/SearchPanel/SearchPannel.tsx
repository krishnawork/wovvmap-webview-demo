import { searchPointsByText } from "@/map-helper/mapService";
import React, { type ChangeEvent } from "react";
import { StyleSheet, View } from "react-native";
import { handleFromInputClear, handleToInputClear } from "../../helper/uiService";
import { uiStore } from "../../store/simpleUiStore";
import { PlaceSearchInput } from "../PlaceSearch/PlaceSearchInput";
import RenderStoreList from "../RenderSearchList/storeList/StoreList";

interface RenderSearchInputProps { classes?: string }

export const RenderToSearchInput: React.FC<RenderSearchInputProps> = () => {
  const [toInputValue, setToInputValue] = uiStore.signal("toInputValue");
  const [selectCatogry] = uiStore.signal("selectCatogry");

  const handleChange = (e: ChangeEvent<HTMLInputElement> | { target: { value: string } }) => {
    const v = (e as any)?.target?.value ?? "";
    console.log('v: ', v);

    if (selectCatogry && selectCatogry === v) {
      uiStore.set("toInputListing", searchPointsByText(v));
    } else {
      const endpointStore = searchPointsByText(v)
      console.log('endpointStore: ', endpointStore);
      uiStore.set("toInputListing", endpointStore);
      
    }
  };

  return (
    <PlaceSearchInput
      placeholder="What are you looking for?"
      value={toInputValue || ""}
      onChange={(e) => {
        handleChange(e);
        setToInputValue((e as any).target.value);
      }}
      onFocus={() => {
        uiStore.set("showStapByStapList", false);
        uiStore.set("bottomSheetHeight", 100);
        uiStore.set("isFocusToInput", true);
        uiStore.set("showDirectionToStoreList", true);
        uiStore.set("showDirectionFromStoreList", false);
        handleChange({ target: { value: toInputValue || "" } });
      }}
      onBlur={() => {
        setTimeout(() => {
          uiStore.set("bottomSheetHeight", 23);
        }, 100);
      }}
      onClear={() => {
        handleToInputClear();
      }}
    />
  );
};

export const RenderFromSearchInput: React.FC<RenderSearchInputProps> = () => {
  const [fromInputValue, setFromInputValue] = uiStore.signal("fromInputValue");

  return (
    <PlaceSearchInput
      placeholder="Search..."
      value={fromInputValue || ""}
      onChange={(e) => {
        const v = (e as any).target.value ?? "";
        uiStore.set("fromInputListing", searchPointsByText(v));
        setFromInputValue(v);
      }}
      onFocus={() => {
        uiStore.set("showStapByStapList", false);
        uiStore.set("isFocusFromInput", true);
        uiStore.set("showDirectionFromStoreList", true);
        uiStore.set("showDirectionToStoreList", false);
        uiStore.set("fromInputListing", searchPointsByText(fromInputValue || ""));
      }}
      onClear={() => {
        handleFromInputClear();
      }}
    />
  );
};

export default function SearchPanel() {
  const [isFocusToInput] = uiStore.signal("isFocusToInput");

  return (
    <React.Fragment>
    <View
      style={styles.panel}
      // RN me stopPropagation ka exact API nahi hota; panel upar hi hai so it's okay.
    >
      {/* search input */}
      <View style={styles.inputWrap}>
        <RenderToSearchInput />
      </View>

      {/* show store list only while focusing To input */}
    </View>
      {isFocusToInput ? <RenderStoreList /> : null}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 20,
  },
  inputWrap: {
    position: "absolute",
    top: 55,
    left: 0,
    width: "80%",
    paddingHorizontal: 14,
    zIndex: 10,
  },
});
