import { render, screen } from '@testing-library/react'
import App from './App'
import { CornMenu } from './components/Corn/CornMenu/CornMenu'

test('render menu', () => {
  render(<CornMenu />)
  const linkElement = screen.getByText('Реки')
  expect(linkElement).toBeInTheDocument()
})
