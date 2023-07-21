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

export const GITHUB_URL = 'https://github.com/Nauxscript/solidida'

export const goToGithub = () => window.open(GITHUB_URL)
