

import DirectionPanel from "./component/DirectionPanel/DirectionPanel"
import FloorSelector from "./component/FloorSelector/FloorSelector"
import NextPrePath from "./component/NextPrePath/NextPrePath"
import SearchPanel from "./component/SearchPanel/SearchPannel"
import { uiStore } from "./store/simpleUiStore"

const RenderModal = () => {
  const [showDirectionModal] = uiStore.signal("showDirectionModal")

  return (
    <>
      {showDirectionModal ? <DirectionPanel /> : <SearchPanel />}
    </>
  )
}


let SimpleTemplate = () => {


  return (
    <>
      <RenderModal />
      <FloorSelector />
      <NextPrePath />

    </>
  )
}

export default SimpleTemplate