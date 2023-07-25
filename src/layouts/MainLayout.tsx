import type { JSX } from 'solid-js'
import { MainLayoutContext } from './MainLayoutContext'
import useDividerDrag from '@/hooks/useDividerDrag'

export default function MainLayout(props: {
  archive: JSX.Element
  tasks: JSX.Element
  editor: JSX.Element
}) {
  const [leftEleRef, setLeftEleRef] = createSignal<HTMLDivElement>()
  const [rightEleRef, setRightEleRef] = createSignal<HTMLDivElement>()
  const [centerEleRef, setCenterEleRef] = createSignal<HTMLDivElement>()
  const { handleLeftDividerDrag, handleRightDividerDrag, setRightEleRange, resetRightWidth } = useDividerDrag(leftEleRef, rightEleRef, centerEleRef)

  const [archiveShow, setArchiveShow] = createSignal(true)

  const toggleArchivePanel = () => {
    setArchiveShow(prev => !prev)
    setRightEleRange(!archiveShow() ? [300, 1000] : undefined)
    resetRightWidth()
  }

  const context = {
    archiveShow,
    toggleArchivePanel,
  }

  return (
    <MainLayoutContext.Provider value={context}>
      <div flex w-full h-full>
        <Show when={archiveShow()}>
        <div ref={el => setLeftEleRef(el)} w-300px overflow-y-auto py-2>
          {props.archive}
        </div>
        <div w-2px bg-gray-1 hover:bg-blue-1 cursor-ew-resize onMouseDown={handleLeftDividerDrag}></div>
        </Show>
        <div ref={el => setCenterEleRef(el)} flex-1 overflow-y-auto>
          {props.tasks}
        </div>
        <div w-2px bg-gray-1 hover:bg-blue-1 cursor-ew-resize onMouseDown={handleRightDividerDrag}></div>
        <div ref={el => setRightEleRef(el)} w-400px overflow-y-auto>
          {props.editor}
        </div>
      </div>
    </MainLayoutContext.Provider>
  )
}
