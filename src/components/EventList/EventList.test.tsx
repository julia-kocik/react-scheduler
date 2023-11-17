/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react'
import EventList from './EventList'
import '@testing-library/jest-dom'
import { Dispatch, SetStateAction } from 'react';

it('App Router: Works with Client Components (React State)', () => {
  const setForceFetchAfterDelete: Dispatch<SetStateAction<boolean>> = jest.fn();
  const setForceFetchAfterUpdate: Dispatch<SetStateAction<boolean>> = jest.fn();

  const setToastInfo: Dispatch<SetStateAction<object>> = jest.fn();
  render(<EventList setToastInfo={setToastInfo} setForceFetchAfterDelete={setForceFetchAfterDelete} setForceFetchAfterUpdate={setForceFetchAfterUpdate} eventsData={[]} />)
})
