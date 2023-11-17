/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react'
import EventListItem from './EventListItem'
import '@testing-library/jest-dom'
import { Dispatch, SetStateAction } from 'react'

const eventListItem = {
  id: '123',
  name: 'Julia',
  surname: 'Test',
  email: 'julia@test.com',
  date: new Date()
}

it('App Router: Works with Client Components (React State)', () => {
  const setForceFetchAfterDelete: Dispatch<SetStateAction<boolean>> = jest.fn();
  const setForceFetchAfterUpdate: Dispatch<SetStateAction<boolean>> = jest.fn();
  const setToastInfo: Dispatch<SetStateAction<object>> = jest.fn();
  render(<EventListItem setToastInfo={setToastInfo} setForceFetchAfterUpdate={setForceFetchAfterUpdate} setForceFetchAfterDelete={setForceFetchAfterDelete} {...eventListItem} />)
})
