const BillingMonthDefinitions = {
  DIVIDER: "/",
  MIN_YEAR: 2000,
  MAX_YEAR: 2350,
}

export const isDateRangeValid = (initial?: string, final?: string): boolean => {
  try {
    const initialMonth = Number(
      initial?.split(BillingMonthDefinitions.DIVIDER)[0]
    )
    const initialYear = Number(
      initial?.split(BillingMonthDefinitions.DIVIDER)[1]
    )
    const finalMonth = Number(final?.split(BillingMonthDefinitions.DIVIDER)[0])
    const finalYear = Number(final?.split(BillingMonthDefinitions.DIVIDER)[1])

    /* Initial and final months must be valid. */
    if (
      initialMonth < 1 ||
      initialMonth > 12 ||
      finalMonth < 1 ||
      finalMonth > 12
    ) {
      return false
    }

    /* Initial and final year must be in the valid range of years. */
    if (
      initialYear < BillingMonthDefinitions.MIN_YEAR ||
      finalYear > BillingMonthDefinitions.MAX_YEAR
    ) {
      return false
    }

    /* All values must be valid */
    if (!initialMonth || !initialYear || !finalMonth || !finalYear) {
      return false
    }

    /* Final year must be greater than or equal to the initial year */
    if (initialYear > finalYear) return false

    if (initialYear === finalYear) {
      /* For the same year, the final month must be greater than or equal to the initial month */
      if (initialMonth > finalMonth) return false
    }

    return true
  } catch (err) {
    return false
  }
}

export const getBillingDatesByRange = (
  initial?: string,
  final?: string
): string[] => {
  if (initial && !final) return [initial]
  if (!isDateRangeValid(initial, final)) return []

  const months = [initial as string]
  let current: string = initial as string

  while (current !== final) {
    const rawMonth = Number(current.split(BillingMonthDefinitions.DIVIDER)[0])
    const rawYear = Number(current.split(BillingMonthDefinitions.DIVIDER)[1])
    const isLastMonth = rawMonth === 12
    const month = isLastMonth ? "01" : String(rawMonth + 1).padStart(2, "0")
    const year = isLastMonth ? rawYear + 1 : String(rawYear)

    current = `${month}${BillingMonthDefinitions.DIVIDER}${year}`

    months.push(current)
  }

  return months
}
