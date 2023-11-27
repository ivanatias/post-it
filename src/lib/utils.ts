import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { PostDetails } from './sanity/types/post'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const parseUserID = (rawUserID: string) => {
  return rawUserID.split('user_').at(1) as string
}

export const formatLikedBy = (data: Pick<PostDetails, 'saved'>['saved']) => {
  const END_SAVED_SLICE_NUM = 2
  const shouldBeSliced = data.length >= END_SAVED_SLICE_NUM + 1

  const sliced = shouldBeSliced ? data.slice(0, END_SAVED_SLICE_NUM) : data

  const rest = data.slice(END_SAVED_SLICE_NUM)
  const hasRest = rest.length > 0

  const usersToShow = sliced.map(({ postedBy }) => postedBy.userName)

  const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: hasRest ? 'unit' : 'conjunction'
  })
  const formattedUsersToShow = formatter.format(usersToShow)

  const likedByText = `Liked by ${formattedUsersToShow} ${
    hasRest ? `and ${rest.length} others` : ''
  }`

  return {
    likedByText,
    sliced
  }
}

export const formatTimeago = (timestamp: number) => {
  const DATE_UNITS_SECONDS = {
    year: 3.154e7,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  }

  const rtf = new Intl.RelativeTimeFormat('en', {
    style: 'long',
    localeMatcher: 'best fit',
    numeric: 'always'
  })

  const getSecondsDiff = (timestamp: number) => {
    return (Date.now() - timestamp) / 1000
  }

  const getUnitAndValueDate = (secondsElapsed: number) => {
    for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS_SECONDS)) {
      if (secondsElapsed >= secondsInUnit || unit === 'second') {
        const value = Math.floor(secondsElapsed / secondsInUnit) * -1
        return { value, unit }
      }
    }
  }

  const secondsElapsed = getSecondsDiff(timestamp)
  const result = getUnitAndValueDate(secondsElapsed)
  if (result === undefined) return

  const { value, unit } = result
  return rtf.format(value, unit as Intl.RelativeTimeFormatUnit)
}
