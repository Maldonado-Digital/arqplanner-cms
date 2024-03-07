// biome-ignore lint/nursery/noUnusedImports: <explanation>
import React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <title>ArqPlanner Icon</title>
    <path
      fill="#ABA6A1"
      d="M15.464 2H8.536A6.536 6.536 0 0 0 2 8.536v7.059a6.536 6.536 0 0 0 6.536 6.536h6.928A6.536 6.536 0 0 0 22 15.595v-7.06A6.536 6.536 0 0 0 15.464 2Z"
    />
    <path
      fill="#fff"
      d="M11.77 10.838h-.016v-.77h-.802v4.201h.802v-2.132c0-.906.553-1.38 1.347-1.38.192-.001.384.026.569.08v-.865a1.567 1.567 0 0 0-.457-.048c-.537 0-1.066.248-1.443.914ZM4.547 14.27h.914l.345-.79.966-2.241h-.854l-1.371 3.03ZM8.106 8.545h-.87l.35.786v.003l.548 1.264.55 1.266 1.042 2.405h.97l-2.59-5.724ZM17.737 10.068h.801v5.816h-.8v-2.203h-.017c-.312.505-.977.729-1.594.729-1.258 0-2.284-.81-2.284-2.22 0-1.41 1.025-2.219 2.284-2.219.617 0 1.282.24 1.594.681h.016v-.584Zm-1.506 3.669c.93 0 1.554-.585 1.554-1.546 0-.802-.465-1.547-1.554-1.547-1.081 0-1.538.745-1.538 1.547 0 .97.6 1.546 1.538 1.546Z"
    />
  </svg>
)
export default SvgComponent
