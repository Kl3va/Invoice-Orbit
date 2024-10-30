const currencyLocale: { [key in 'USD' | 'EUR' | 'NGN' | 'GBP']: string } = {
  USD: 'en-US',
  EUR: 'de-DE',
  NGN: 'en-NG',
  GBP: 'en-GB',
}

const sliceStr = (str: string, isId: boolean = false) => {
  if (isId) return `${str.slice(0, 7)}...`

  return str.length > 17 ? `${str.slice(0, 17)}...` : str
}

const formatCreateDate = (isoDate: string) => {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  return date.toISOString().split('T')[0] // Extracts only the yyyy-MM-dd part
}

function formatDueDate(dateString: string): string {
  const dateObject = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }
  const formattedDate = dateObject.toLocaleDateString('en-GB', options)
  return `Due ${formattedDate}`
}

// function formatLargeNumber(
//   value: number,
//   locale: string,
//   currency: string,
//   isNormalFormat: boolean = true
// ) {
//   if (isNormalFormat) {
//     // If `isNormalFormat` is true, return a regular formatted number
//     return new Intl.NumberFormat(locale, {
//       style: 'currency',
//       currency: currency,
//       maximumFractionDigits: 2,
//     }).format(value)
//   }

//   let formattedNumber

//   if (value >= 1e9) {
//     // Billion (1,000,000,000)
//     formattedNumber = (value / 1e9).toFixed(2) + 'b+'
//   } else {
//     // Less than 1b, format normally
//     formattedNumber = new Intl.NumberFormat(locale, {
//       style: 'currency',
//       currency: currency,
//       maximumFractionDigits: 2,
//       minimumFractionDigits: 2,
//     }).format(value)
//     return formattedNumber
//   }

//   // Append the currency symbol manually to the shortened number
//   const currencySymbolPart = new Intl.NumberFormat(locale, {
//     style: 'currency',
//     currency: currency,
//     currencyDisplay: 'narrowSymbol', // Use narrow symbol for $, €, ₦
//   })
//     .formatToParts(0)
//     .find((part) => part.type === 'currency')

//   // Check if currencySymbolPart is undefined
//   const currencySymbol = currencySymbolPart?.value || ''
//   return currencySymbol + formattedNumber
// }

function formatLargeNumber(
  value: number,
  locale: string,
  currency: string,
  isNormalFormat: boolean = true
): string {
  const numberFormat = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })

  if (isNormalFormat || value < 1e9) {
    return numberFormat.format(value)
  }

  // For values >= 1 billion and !isNormalFormat
  const currencySymbol =
    numberFormat.formatToParts(0).find((part) => part.type === 'currency')
      ?.value ?? ''

  const billionValue = (value / 1e9).toFixed(2)
  return `${currencySymbol}${billionValue}b+`
}

const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export {
  sliceStr,
  formatCurrency,
  formatLargeNumber,
  formatDueDate,
  currencyLocale,
  formatCreateDate,
}
