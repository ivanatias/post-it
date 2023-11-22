export const FORM_STATUS = {
  IDLE: 'idle',
  SUCCESS: 'success',
  ERROR: 'error'
} as const

export const initialFormState = {
  status: FORM_STATUS.IDLE,
  message: ''
}
