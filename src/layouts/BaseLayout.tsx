import { children } from 'solid-js'
import Header from '@/components/Header/index'
import Navbar from '@/components/Navbar/index'
import type { ParentComponent } from '@/utils/typeHelper'

const BaseLayout: ParentComponent = (props) => {
  const c = children(() => props.children)

  return <div h-100vh w-100vw overflow-hidden>
    <Header></Header>
    <div class="flex">
      <Navbar></Navbar>
      <div class="grow">
        {c()}
      </div>
    </div>
  </div>
}

export default BaseLayout
