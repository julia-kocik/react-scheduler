import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from './Button';

describe('Toast', () => {
  test('renders Toast component', () => {
    const onClickHandler: () => void = jest.fn();
  render(<Button title='Hello' color='red' onClickHandler={onClickHandler}/>);
    expect(screen.getByText(/Hello/)).toBeInTheDocument();
  });
});
