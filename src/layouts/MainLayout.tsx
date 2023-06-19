import useDividerDrag from '@/hooks/useDividerDrag'

export default function MainLayout() {
  const [leftEleRef, setLeftEleRef] = createSignal<HTMLDivElement>()
  const [rightEleRef, setRightEleRef] = createSignal<HTMLDivElement>()
  const [centerEleRef, setCenterEleRef] = createSignal<HTMLDivElement>()
  const { handleLeftDividerDrag, handleRightDividerDrag } = useDividerDrag(leftEleRef, rightEleRef, centerEleRef)
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
