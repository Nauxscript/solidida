import MainLayout from '@/layouts/MainLayout'
import Editor from '@/components/Editor/index'

export default function Home() {
  const handleEditorContentChange = (content: string) => {
    // eslint-disable-next-line no-console
    console.log(content)
  }
  return (
    <MainLayout editor={<Editor onChange={handleEditorContentChange} />}></MainLayout>
  )
}
