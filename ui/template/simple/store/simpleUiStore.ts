import { createStore } from "koshin";


type UIStore = {
    fromInputValue: string
    toInputValue: string
    
    isFocusToInput : boolean
    isFocusFromInput : boolean

    fromInputListing: NodePoint[]
    toInputListing: NodePoint[]
    
    showDirectionModal: boolean
    showDirectionFromStoreList: boolean
    showDirectionToStoreList: boolean
    showStapByStapList : boolean
    selectCatogry: null | string

    currentStape:number
    currentFloorIndex:number
    currentPointIndex:number

    isMinimizedDirectionPanel : boolean
    bottomSheetHeight : number

    
};

export let uiStore = createStore<UIStore>({
    fromInputValue : "",
    toInputValue : "",  

    isFocusToInput:false,
    isFocusFromInput:false,

    fromInputListing : [],
    toInputListing : [],


    showDirectionModal: false,
    showDirectionFromStoreList: false,
    showDirectionToStoreList: false,
    showStapByStapList: false,

    selectCatogry:null,


    currentStape:-1,
    currentFloorIndex:-1,
    currentPointIndex:-1,

    isMinimizedDirectionPanel : false,
    bottomSheetHeight : 25,

   

})
