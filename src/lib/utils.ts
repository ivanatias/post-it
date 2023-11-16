import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const parseUserID = (rawUserID: string) => {
  return rawUserID.split('user_').at(1) as string
}
