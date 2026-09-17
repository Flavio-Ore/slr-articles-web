export const checkIsValidBlob = (blob: Blob | null): boolean => {
  if (!blob) {
    return false
  }
  if (!(blob instanceof Blob)) {
    return false
  }
  if (blob.size === 0) {
    return false
  }
  if (blob.type !== 'application/pdf') {
    return false
  }
  return true
}
