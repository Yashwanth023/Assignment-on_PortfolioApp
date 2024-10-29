import { twMerge } from 'tailwind-merge'

interface ShimmerProps {
  className?: string
}

export function Shimmer({ className }: ShimmerProps) {
  return (
    <div className={twMerge("relative overflow-hidden bg-gray-200 rounded", className)}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200" />
    </div>
  )
}