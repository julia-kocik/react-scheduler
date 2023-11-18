import { fireEvent, render, screen } from '@testing-library/react'
import EventList from './EventList'
import '@testing-library/jest-dom'
import { Dispatch, SetStateAction } from 'react';

describe('EventList', () => {
  const setForceFetchAfterDelete: Dispatch<SetStateAction<boolean>> = jest.fn();
  const setForceFetchAfterUpdate: Dispatch<SetStateAction<boolean>> = jest.fn();
  const setToastInfo: Dispatch<SetStateAction<object>> = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders EventList component', () => {
    render(
      <EventList 
        setToastInfo={setToastInfo} 
        setForceFetchAfterDelete={setForceFetchAfterDelete} 
        setForceFetchAfterUpdate={setForceFetchAfterUpdate} 
        eventsData={[]} 
      />
    )
    expect(screen.getByText(/No events saved yet/)).toBeInTheDocument();
  });

  test('renders EventList component', () => {
    render(
      <EventList 
        setToastInfo={setToastInfo} 
        setForceFetchAfterDelete={setForceFetchAfterDelete} 
        setForceFetchAfterUpdate={setForceFetchAfterUpdate} 
        eventsData={[{id: '123', name: 'Zosia', surname: 'Kocik', email: 'john.doe@example.com', date: new Date()}]} 
      />
    )
    expect(screen.queryByText(/No events saved yet/)).toBeNull();
    expect(screen.getByText(/Zosia/)).toBeInTheDocument();
  });
});
