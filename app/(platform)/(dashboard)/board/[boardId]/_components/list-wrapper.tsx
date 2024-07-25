export default function ListWrapper(
  {children}:{children:React.ReactNode}
) {
  return <li className="shrink-0 h-full w-[270px] select-none">{children}</li>
} 