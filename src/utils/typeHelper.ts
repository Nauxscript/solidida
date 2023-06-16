import type { Component, JSX } from 'solid-js'

type ParentProps<P = {}> = P & { children?: JSX.Element }
export type ParentComponent<P = {}> = Component<ParentProps<P>>
