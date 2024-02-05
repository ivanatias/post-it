import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'

type UserAvatarProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  imageUrl: string
  userName: string
}

export function UserAvatar({
  imageUrl,
  userName,
  size = 'md',
  className
}: UserAvatarProps) {
  const splitted = userName.split(' ')
  const fallbackText =
    `${splitted.at(0)?.charAt(0)}${splitted.at(1)?.charAt(0)}`.toUpperCase()

  return (
    <Avatar
      className={cn(
        className,
        size === 'sm' && 'w-6 h-6',
        size === 'md' && 'w-8 h-8',
        size === 'lg' && 'w-10 h-10'
      )}
    >
      <AvatarImage className='object-cover' src={imageUrl} />
      <AvatarFallback className='text-xs'>{fallbackText}</AvatarFallback>
    </Avatar>
  )
}
