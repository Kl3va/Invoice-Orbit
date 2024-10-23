import {
  NotFoundContainer,
  NotFoundContent,
  NotFoundButton,
} from './NotFoundStyles'

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundContent>
        <h1>404</h1>
        <p>Oops! Page not found</p>
        <NotFoundButton to='/'>Go Back Home</NotFoundButton>
      </NotFoundContent>
    </NotFoundContainer>
  )
}

export default NotFound
