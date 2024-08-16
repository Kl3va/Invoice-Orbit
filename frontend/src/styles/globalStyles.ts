import { createGlobalStyle } from 'styled-components'
import { QUERIES } from 'styles/mediaQueries'
import { ThemeTypes } from 'styles/theme'

export const GlobalStyles = createGlobalStyle<{ theme: ThemeTypes }>`
    :root {
        --color-bg-100: ${(props) => props.theme.bg100};
        --color-bg-200: ${(props) => props.theme.bg200};
        --color-bg-300: ${(props) => props.theme.bg300};
        --color-bg-400: ${(props) => props.theme.bg400};
        --color-bg-500: ${(props) => props.theme.bg500};
        --color-bg-600: ${(props) => props.theme.bg600};
        --color-bg-draft: #1E2139;
        --color-bg-delete: #EC5757;
        --color-accent-100: #7C5DFA;
        --color-accent-200: #9277FF;
        --color-accent-300: #33D69F;
        --color-accent-400: #FF8F00
        --color-accent-500: #DFE3FA;
        --color-font-100: ${(props) => props.theme.font100};
        --color-font-200: ${(props) => props.theme.font200};
        --color-font-300: ${(props) => props.theme.font300};
        --color-border-100: ${(props) => props.theme.border100};
        --font-pry-100: 'League Spartan', sans-serif;
        --max-container: 76rem;
        --center-container: 0 auto;
        --border-radius: 0.5rem;
        --transition: all 0.5s;
    }

    html {
        scrollbar-width: none;
        font-size: 100%;
    }
    * {
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
      width: 8px;
      height: 4px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: var(--color-scroll-bar);
      box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
      border-radius: 100vw;
      margin: 1px;
    }

    @supports (scrollbar-color: var(--color-scroll-bar) var(--color-scroll-bar)) {
      * {
        scrollbar-color: var(--color-scroll-bar) transparent;
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
        // overflow-y: auto;
        // overflow-x: hidden;
        // min-height: 100vh;
        // max-width: 100vw;
    }

    p {
      color: var(--color-font-100);
      font-size: 1.25rem;
      line-height: 1.5rem;
      font-weight: 400;
    }

    label {
    font-size: 0.875rem;
    color: var(--color-font-400);
    font-weight: 500;
  }

   textarea {
    resize: none;
  }

    h1, h2, h3 {
       text-transform: capitalize;
       color: var(--color-font-200);
    }

    h1 {
      font-size: clamp(2rem, calc(2.5vw + .5rem), 3rem);
     //font-size: 3rem;
      line-height: 2.3rem;
      font-weight: 500;

      @media ${QUERIES.tabletMini} {
        line-height: 3rem;
      }

      @media ${QUERIES.desktop} {
        line-height: 3.75rem;
      }
    }

    h2 {

      font-size: 1.7rem;
      font-weight: 600;
      line-height: 2rem;
      letter-spacing: -0.045rem;

      @media ${QUERIES.tablet} {
        line-height: 2.25rem;
        font-size: 2.25rem;
      }
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

input {
padding: 0.625rem 0.875rem;
border-radius: 0.5rem;
border: 2px solid var(--color-accent-200);
background: var(--color-bg-100);
}

`
