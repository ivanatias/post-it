interface SpinnerProps {
  width?: number
}

export function Spinner({ width }: SpinnerProps) {
  return (
    <div
      className='border-2 border-red-500 border-l-transparent animate-spin rounded-full'
      style={{
        width: width ?? 32,
        height: width ?? 32
      }}
    />
  )
}
