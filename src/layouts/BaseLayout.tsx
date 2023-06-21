import type { ParentComponent } from 'solid-js'
import { children } from 'solid-js'
import Navbar from '@/components/Navbar/index'

const BaseLayout: ParentComponent = (props) => {
  const c = children(() => props.children)
  return <div h-100vh w-100vw overflow-hidden>
    <div flex h-full>
      <Navbar></Navbar>
      <div w-full>
        {c()}
      </div>
    </div>
  </div>
}

export default BaseLayout
