import { searchPointsByText } from "@/map-helper/mapService"
import { NodePoint, sendEndPointToBridge, sendStartPointToBridge } from "wovvmap-webview-bridge"
import { uiStore } from "../store/simpleUiStore"



export const handleToDirectionClick = (nodePoint: NodePoint) => {
    if (!uiStore.showDirectionModal) {
        uiStore.set("isMinimizedDirectionPanel", false)
    }
    sendEndPointToBridge(nodePoint.key)

    uiStore.set("toInputValue", nodePoint.LocationName?.text!)
    uiStore.set("isFocusToInput", false)
    uiStore.set("showDirectionToStoreList", false)
}


export const handleFromDirectionClick = (nodePoint: NodePoint) => {
    sendStartPointToBridge(nodePoint.key)
    uiStore.set("fromInputValue", nodePoint.LocationName?.text!)
    uiStore.set("isFocusFromInput", false)
    uiStore.set("showDirectionFromStoreList", false)
}

export const handleSceneClick = () => {
    uiStore.set("isFocusToInput", false)
    uiStore.set("showDirectionFromStoreList", false)
    uiStore.set("showDirectionToStoreList", false)
}


export const handleToInputClear = () => {
    killPath()
    sendEndPointToBridge("")
    uiStore.set("toInputValue", "")
    uiStore.set("isFocusToInput", false)
    uiStore.set("selectCatogry", null)

}


export const handleFromInputClear = () => {
    killPath()
    sendStartPointToBridge("")
    uiStore.set("fromInputValue", "")
    uiStore.set("isFocusFromInput", false)
}

export const handleDirectionBack = () => {
    handleFromInputClear()
    uiStore.set("showDirectionModal", false)
}


 export const handleShapClick = (nodePoint: NodePoint) => {
    console.log('nodePoint: ', nodePoint);
            handleDirectionBack()
            uiStore.set("isFocusToInput", true)
            uiStore.set("toInputValue", nodePoint.LocationName?.text!)
            uiStore.set("toInputListing", searchPointsByText(nodePoint.LocationName?.text!))
            uiStore.set("bottomSheetHeight", 23)
            sendEndPointToBridge(nodePoint.key)

    }



const killPath = () => {

}