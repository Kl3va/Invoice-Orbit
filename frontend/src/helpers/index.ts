const sliceStr = (str: string) => {
  return str.length > 17 ? `${str.slice(0, 17)}...` : str
}

const formatNumber = (num: number) => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B+`
  } else {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
}

export { sliceStr, formatNumber }
