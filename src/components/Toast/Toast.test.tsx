import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Toast from './Toast';

describe('Toast', () => {
  test('renders Toast component', () => {
    render(<Toast message='Hello' color='red'/>);
    expect(screen.getByText(/Hello/)).toBeInTheDocument();
  });
});
