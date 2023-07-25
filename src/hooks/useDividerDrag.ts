import type { Accessor } from 'solid-js'

const LEFT_WIDTH_RANGE = [200, 300]
const RIGHT_WIDTH_RANGE = [300, 700]

enum ActiveEle {
  LEFT,
  RIGHT,
}

export default function useDividerDrag(leftEleRef: Accessor<HTMLDivElement | undefined>, rightEleRef: Accessor<HTMLDivElement | undefined>, centerEleRef: Accessor<HTMLDivElement | undefined>) {
  let currEleFlag: ActiveEle | undefined
  let currEvent: MouseEvent | undefined
  let CURR_RIGHT_WIDTH_RANGE: [number, number] | undefined

  const getOffset = (flag: ActiveEle) => {
    return flag === ActiveEle.LEFT ? 48 : 48 + leftEleRef()!.clientWidth + centerEleRef()!.clientWidth
  }

  const getDistance = (clientX: number, offset: number, targetWidth: number) => {
    return clientX - offset - targetWidth
  }

  const matchRange = (range: number[], value: number) => {
    const [min, max] = range
    if (value < min)
      return min
    else if (value > max)
      return max
    return value
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
      widthRange = CURR_RIGHT_WIDTH_RANGE || RIGHT_WIDTH_RANGE
    }
    if (!currEvent || !currEle || currEleFlag === undefined)
      return
    const currOffset = getOffset(currEleFlag)
    const distance = getDistance(event.clientX, currOffset, selfWidth)
    const calculatedValue = currEle.clientWidth + (currEleFlag === ActiveEle.LEFT ? distance : -distance)
    const currWidth = matchRange(widthRange, calculatedValue)
    currEle.style.width = `${currWidth}px`
  }

  const upHandler = () => {
    // eslint-disable-next-line no-console
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

  const resetRightWidth = () => {
    // eslint-disable-next-line no-console
    console.log(rightEleRef()?.clientWidth)
    const range = CURR_RIGHT_WIDTH_RANGE || RIGHT_WIDTH_RANGE
    const rightEle = rightEleRef()
    const maxWidth = range[1]
    if (rightEle && rightEle.clientWidth > maxWidth)
      rightEle.style.width = `${maxWidth}px`
  }

  const setRightEleRange = (range?: [number, number]) => CURR_RIGHT_WIDTH_RANGE = range

  return {
    handleLeftDividerDrag,
    handleRightDividerDrag,
    setRightEleRange,
    resetRightWidth,
  }
}
