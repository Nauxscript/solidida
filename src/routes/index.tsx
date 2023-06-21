import MainLayout from '@/layouts/MainLayout'
import Editor from '@/components/Editor/index'
import Archive from '@/components/Archive/index'

export default function Home() {
  const handleEditorContentChange = (content: string) => {
    // eslint-disable-next-line no-console
    console.log(content)
  }
  return (
    <MainLayout archive={<Archive></Archive>} editor={<Editor onChange={handleEditorContentChange} />}></MainLayout>
  )
}
