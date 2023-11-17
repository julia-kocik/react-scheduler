/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react'
import Button from './Button'
import '@testing-library/jest-dom'

it('renders Toast component', () => {
  const onClickHandler: () => void = jest.fn();
  render(<Button title='Hello' color='red' onClickHandler={onClickHandler}/>);
  // Add your assertions or further test logic here
});
