import { useNavigate } from '@solidjs/router'
export const useGoto = () => {
  const navigate = useNavigate()
  const [currHref, setCurrHref] = createSignal(location.pathname)
  const handleNavigate = (href: string) => {
    setCurrHref(href)
    navigate(href)
  }

  return {
    handleNavigate,
    currHref,
  }
}
