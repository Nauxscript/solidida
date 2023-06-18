import { A } from 'solid-start'

export default function Header() {
  return (
    <header w-full h-12 box-border flex px-4 items-center justify-between>
      <div class="logo">Solidida</div>

      <div class="links">
        <div i-carbon-settings inline-block="" text-gray hover:text-dark mx-2 cursor-pointer></div>
        <A href="https://github.com/Nauxscript/solidida">
          <div i-carbon-logo-github inline-block="" text-gray hover:text-dark mx-2></div>
        </A>
      </div>
    </header>
  )
}
