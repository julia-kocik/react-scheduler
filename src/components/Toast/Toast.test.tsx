/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react'
import Toast from './Toast'
import '@testing-library/jest-dom'
import { Dispatch, SetStateAction } from 'react';

it('renders Toast component', () => {
  render(<Toast message='Hello' color='red'/>);
  // Add your assertions or further test logic here
});
