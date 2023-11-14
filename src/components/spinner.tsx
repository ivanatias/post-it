interface SpinnerProps {
  width?: number
  height?: number
}

export function Spinner({ width, height }: SpinnerProps) {
  return (
    <div
      className='border-2 border-red-500 border-l-transparent animate-spin rounded-full'
      style={{
        width: width ?? 32,
        height: height ?? 32
      }}
    />
  )
}
