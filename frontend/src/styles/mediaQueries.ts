const BREAKPOINTS = {
  xs: 375,
  s: 576,
  m: 629,
  md: 768,
  l: 992,
  xl: 1200,
  xxl: 1500,
}

export const QUERIES = {
  mobileMini: `(min-width: ${BREAKPOINTS.xs / 16}rem)`,
  mobile: `(min-width: ${BREAKPOINTS.s / 16}rem)`,
  mobileLarge: `(min-width: ${BREAKPOINTS.m / 16}rem)`,
  tabletMini: `(min-width: ${BREAKPOINTS.md / 16}rem)`,
  tablet: `(min-width: ${BREAKPOINTS.l / 16}rem)`,
  desktop: `(min-width: ${BREAKPOINTS.xl / 16}rem)`,
  megaDesktop: `(min-width: ${BREAKPOINTS.xxl / 16}rem)`,
}
