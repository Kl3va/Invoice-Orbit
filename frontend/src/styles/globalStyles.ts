import { createGlobalStyle } from 'styled-components'
//import { QUERIES } from 'styles/mediaQueries'
//import { ThemeTypes } from 'styles/theme'

export const GlobalStyles = createGlobalStyle`
    :root {
        --color-bg-100: ${({ theme }) => theme.bg100};
        --color-bg-200: ${({ theme }) => theme.bg200};
        --color-bg-300: ${({ theme }) => theme.bg300};
        --color-bg-400: ${({ theme }) => theme.bg400};
        --color-bg-400: ${({ theme }) => theme.bg400};
        --color-bg-500: ${({ theme }) => theme.bg500};
        --color-bg-600: ${({ theme }) => theme.bg600};
        --color-bg-700: ${({ theme }) => theme.bg700};
        --color-bg-800: ${({ theme }) => theme.bg800};
        --color-bg-draft: #1E2139;
        --color-bg-delete: #EC5757;
        --color-accent-100: #7C5DFA;
        --color-accent-200: #9277FF;
        --color-accent-300: #33D69F;
        --color-accent-400: #FF8F00;
        --color-accent-500: #DFE3FA;
        --color-font-normal: #FFFFFF;
        --color-font-100: ${({ theme }) => theme.font100};
        --color-font-200: ${({ theme }) => theme.font200};
        --color-font-300: ${({ theme }) => theme.font300};
        --color-font-400: ${({ theme }) => theme.font400};
        --color-font-500: ${({ theme }) => theme.font500};
        --color-font-600: ${({ theme }) => theme.font600};
        --color-font-700: ${({ theme }) => theme.font700};
        --color-font-800: #7E88C3;
        --color-border-100: ${({ theme }) => theme.border100};
        --color-border-200: #494E6E;
        --font-pry-100: 'League Spartan', sans-serif;
        --font-size-small: 0.94rem;
        --font-size-mini: 0.81rem;
        --max-container: 45.625rem;
        --center-container: 0 auto;
        --border-radius: 0.5rem;
        --transition: all 0.5s;
    }

    html {
       // scrollbar-width: none;
        font-size: 100%;
    }
    *, *::after,
*::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    input,
    button,
    textarea,
    select {
        font: inherit;
    }

    img {
        display: block;
        max-width: 100%;
        height: auto;
        object-fit: cover;
    }
    li {
        list-style: none;
    }

    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
     
    }

    ::-webkit-scrollbar-thumb {
      background: var(--color-bg-600);
     
      box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
      border-radius: 100vw;
      margin: 1px;
    }

    @supports (scrollbar-color: var(--color-bg-600) var(--color-bg-600))) {
      * {
        scrollbar-color: var(--color-bg-600) transparent;
        scrollbar-width: thin;
      }
    }

    @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
      }
      *,
      *::before,
      *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
      }
    }

    body {
        font-family: var(--font-pry-100);
        font-weight: 500;
        font-optical-sizing: auto;
        background-color: var(--color-bg-100);
        color: var(--color-font-100);
        
        > * {
         
        //min-height: 100vh;
        }
    }

    label {
    font-size: 0.81rem;
    color: var(--color-font-400);
    font-weight: 500;
    letter-spacing: -0.1px;
  }

   textarea {
    resize: none;
  }

  a {
      display: block;
      text-decoration: none;
      transition: var(--transition);
      font-family: inherit;
    }

    h1, h2, h3, h4 {
       text-transform: capitalize;
       color: var(--color-font-100);
        font-weight: 700;
    }

    i {
      background-color: var(--color-accent-100);
      background-image: var(--color-accent-100);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
    }

   /* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

input, select {
padding: 1.125rem 1rem 0.94rem 1.1rem;
width: 100%;
border-radius: 0.2rem;
border: 1px solid var(--color-border-100);
background: var(--color-bg-300);

color: var(--color-font-100);
font-weight: 700;
font-size: var(--font-size-small);


&:focus {
  outline:none;
  border-color: var(--color-accent-100);
  }
}

`
