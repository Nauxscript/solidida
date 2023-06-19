/* eslint-disable no-console */
import type { Accessor } from 'solid-js'

const LEFT_WIDTH_RANGE = [200, 300]
const RIGHT_WIDTH_RANGE = [300, 700]

enum ActiveEle {
  LEFT,
  RIGHT,
}

const useDrag = (leftEleRef: Accessor<HTMLDivElement | undefined>, rightEleRef: Accessor<HTMLDivElement | undefined>, centerEleRef: Accessor<HTMLDivElement | undefined>) => {
  let currEleFlag: ActiveEle | undefined
  let currEvent: MouseEvent | undefined

  const getOffset = (flag: ActiveEle) => {
    return flag === ActiveEle.LEFT ? 48 : 48 + leftEleRef()!.clientWidth + centerEleRef()!.clientWidth
  }

  const getDistance = (clientX: number, offset: number, targetWidth: number) => {
    return clientX - offset - targetWidth
  }

  const moveHandler = (event: MouseEvent) => {
    let currEle: HTMLDivElement
    let selfWidth = 0
    let widthRange = [0, 0]
    if (currEleFlag === ActiveEle.LEFT) {
      currEle = leftEleRef()!
      selfWidth = currEle.clientWidth
      widthRange = LEFT_WIDTH_RANGE
    }
    else {
      currEle = rightEleRef()!
      widthRange = RIGHT_WIDTH_RANGE
    }
    // const currEle = currEleFlag === ActiveEle.LEFT ? leftEleRef() : rightEleRef()
    if (!currEvent || !currEle || currEleFlag === undefined)
      return
    // const distance = event.clientX - currEvent.clientX
    const currOffset = getOffset(currEleFlag)
    // const distance = event.clientX - currOffset - currEle.clientWidth
    const distance = getDistance(event.clientX, currOffset, selfWidth)
    console.log('distance:', distance)
    let endWidth = currEle.clientWidth + (currEleFlag === ActiveEle.LEFT ? distance : -distance)
    console.log(endWidth)
    const [min, max] = widthRange
    if (endWidth < min)
      endWidth = min
    else if (endWidth > max)
      endWidth = max

    currEle.style.width = `${endWidth}px`
  }

  const upHandler = () => {
    console.log('up')
    currEvent = undefined
    currEleFlag = undefined
    document.body.style.userSelect = 'auto'
    document.removeEventListener('mousemove', moveHandler)
    document.removeEventListener('mouseup', upHandler)
  }

  const handleMouseMoving = (trigger: ActiveEle) => {
    currEleFlag = trigger
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', moveHandler)
  }

  const handleMouseUp = () => {
    document.addEventListener('mouseup', upHandler)
  }

  const handleLeftDividerDrag = (event: MouseEvent) => {
    currEvent = event
    handleMouseMoving(ActiveEle.LEFT)
    handleMouseUp()
  }

  const handleRightDividerDrag = (event: MouseEvent) => {
    currEvent = event
    handleMouseMoving(ActiveEle.RIGHT)
    handleMouseUp()
  }

  return {
    handleLeftDividerDrag,
    handleRightDividerDrag,
  }
}

export default function MainLayout() {
  const [leftEleRef, setLeftEleRef] = createSignal<HTMLDivElement>()
  const [rightEleRef, setRightEleRef] = createSignal<HTMLDivElement>()
  const [centerEleRef, setCenterEleRef] = createSignal<HTMLDivElement>()
  const { handleLeftDividerDrag, handleRightDividerDrag } = useDrag(leftEleRef, rightEleRef, centerEleRef)
  return (
    <div flex w-full h-full>
      <div ref={el => setLeftEleRef(el)} w-300px>archive</div>
      <div w-2px bg-gray-1 hover:bg-blue-1 cursor-w-resize onMouseDown={handleLeftDividerDrag}></div>
      <div ref={el => setCenterEleRef(el)} flex-1>Tasks</div>
      <div w-2px bg-gray-1 hover:bg-blue-1 cursor-w-resize onMouseDown={handleRightDividerDrag}></div>
      <div ref={el => setRightEleRef(el)} w-400px>editor</div>
    </div>
  )
}
