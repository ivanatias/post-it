export const FORM_STATUS = {
  IDLE: 'idle',
  SUCCESS: 'success',
  ERROR: 'error'
} as const

export const INITIAL_FORM_STATE = {
  status: FORM_STATUS.IDLE,
  message: ''
}
