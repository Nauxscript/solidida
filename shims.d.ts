import type { AttributifyAttributes } from 'unocss'

declare module 'solid-js' {
  namespace JSX {
    interface HTMLAttributes<T> extends AttributifyAttributes {
      flex?: boolean
      rounded?: boolean
      invisible?: boolean
      border?: string
      focus?: string
    }
  }
}