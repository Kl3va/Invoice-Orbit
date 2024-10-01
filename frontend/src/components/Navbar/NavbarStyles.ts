import styled from 'styled-components'
import { QUERIES } from 'styles/mediaQueries'

export const NavbarAside = styled.aside`
  background-color: var(--color-bg-draft);
  position: fixed;
  height: 4.5rem;
  width: 100%;
  top: 0;
  z-index: 109;

  @media ${QUERIES.tablet} {
    height: 100vh;
    width: 6.44rem;
    border-radius: 0 1.25rem 1.25rem 0;
    left: 0;
    top: 0;
  }
`
export const NavbarContainer = styled.div`
  display: flex;

  @media ${QUERIES.tablet} {
    flex-direction: column;
    height: 100%;
  }
`
export const ThemeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 1.62rem;

  @media ${QUERIES.tablet} {
    flex-direction: column;
    padding: 0 0 1.62rem 0;
    height: 100%;
  }
`

export const LogoContainer = styled.div<{ $isactive: boolean }>`
  width: 4.5rem;
  aspect-ratio: 1 / 1;
  cursor: ${({ $isactive }) => ($isactive ? 'text' : 'pointer')};

  @media ${QUERIES.tablet} {
    width: 6.44rem;
  }
`
export const ProfileContainer = styled.div`
  width: 5rem;
  display: grid;
  place-items: center;
  margin-left: auto;
  border-left: 1px solid var(--color-border-200);

  img {
    width: 2rem;
    aspect-ratio: 1 / 1;
  }

  @media ${QUERIES.tablet} {
    width: 6.44rem;
    height: 5.5rem;
    border-top: 1px solid var(--color-border-200);
    border-left: none;
    margin-top: auto;
    margin-left: 0;
  }
`
