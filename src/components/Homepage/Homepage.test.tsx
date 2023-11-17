/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react'
import Homepage from './Homepage'
import '@testing-library/jest-dom'

it('App Router: Works with Client Components (React State)', () => {
  render(<Homepage />)
})
