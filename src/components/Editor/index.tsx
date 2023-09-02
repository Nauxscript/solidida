import { createSignal } from 'solid-js'
import type { Instance } from 'ink-mde'
import { defineOptions, ink } from 'ink-mde'
import type { Task } from '@/store'
import { useTasksStore } from '@/store'

export interface EditorProps {
  content?: string
  onChange: (content: string) => void
}

function Editor(props: EditorProps) {
  const [editorRef, setEditorRef] = createSignal<HTMLDivElement>()
  const [editorClass, setEditorClass] = createSignal<Instance>()

  const editorCustomStyle = {
    '--ink-block-background-color': '#f9fafb',
  }

  const taskStore = useTasksStore()

  const combineTitleAndContent = (task?: Task) => {
    if (!task)
      return ''
    return `# ${task.title}\n${task.content}`
  }

  createEffect(on(() => taskStore.activeTask, () => {
    editorClass()?.update(combineTitleAndContent(taskStore.activeTask))
  }))

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
      appearance: 'light',
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
