import { DefaultTheme } from 'styled-components'

export interface ThemeTypes extends DefaultTheme {
  bg100: string
  bg200: string
  bg300: string
  bg400: string
  bg500: string
  bg600: string
  bg700: string
  bg800: string
  bg900: string
  bg999: string
  font100: string
  font200: string
  font300: string
  font400: string
  font500: string
  font600: string
  font700: string
  font900: string
  border100: string
}

export const lightTheme: ThemeTypes = {
  bg100: '#F8F8FB',
  bg200: '#373B53',
  bg300: '#FFFFFF',
  bg400: '#F9FAFE',
  bg500: '#373B53',
  bg600: '#DFE3FA',
  bg700: '#DFE3FA',
  bg800: '#FFFFFF',
  bg900: 'hsl(220, 14%, 90%)',
  bg999: 'hsl(220, 14%, 95%)',
  font100: '#0C0E16',
  font200: '#888EB0',
  font300: '#7E88C3',
  font400: '#7E88C3',
  font500: '#888EB0',
  font600: '#858BB2',
  font700: '#7E88C3',
  font900: '#373B53',
  border100: '#DFE3FA',
}

export const darkTheme: ThemeTypes = {
  bg100: '#141625',
  bg200: '#373B53',
  bg300: '#1E2139',
  bg400: '#252945',
  bg500: '#0C0E16',
  bg600: '#252945',
  bg700: '#FFFFFF',
  bg800: '#141625',
  bg900: 'hsl(220, 14%, 25%)',
  bg999: 'hsl(220, 14%, 35%)',
  font100: '#FFFFFF',
  font200: '#DFE3FA',
  font300: '#DFE3FA',
  font400: '#888EB0',
  font500: '#DFE3FA',
  font600: '#FFFFFF',
  font700: '#FFFFFF',
  font900: '#DFE3FA',
  border100: '#DFE3FA',
}
