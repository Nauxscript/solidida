import { createSignal } from 'solid-js'
import type { Instance } from 'ink-mde'
import { Appearance, defineOptions, ink } from 'ink-mde'

export interface EditorProps {
  content?: string
  onChange: (content: string) => void
}

const Editor = (props: EditorProps) => {
  const [editorRef, setEditorRef] = createSignal<HTMLDivElement>()
  const [editorClass, setEditorClass] = createSignal<Instance>()

  const editorCustomStyle = {
    '--ink-block-background-color': '#f9fafb',
  }

  const editorOptions = defineOptions({
    doc: props.content || undefined,
    files: {
      clipboard: true,
    },
    hooks: {
      afterUpdate: (doc: string) => {
        props.onChange(doc)
      },
    },
    interface: {
      appearance: Appearance.Light,
      attribution: false,
      toolbar: false,
      lists: true,
    },
    // vim: true,
  })

  const handleInitEditor = (el: HTMLDivElement) => {
    setEditorRef(el)
    const editor = ink(el, editorOptions)
    setEditorClass(editor)
  }

  return <div ref={handleInitEditor} class="ink-mde-editor" w-full h-full style={editorCustomStyle}></div>
}

export default Editor
