import { act, render, screen, waitFor } from '@testing-library/react'
import Homepage from './Homepage'
import '@testing-library/jest-dom'
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

describe('Homepage', () => {
  // const setForceFetchAfterPostMock: Dispatch<SetStateAction<boolean>> = jest.fn();
  // const setForceFetchAfterDeleteMock: Dispatch<SetStateAction<boolean>> = jest.fn();
  // const setForceFetchAfterUpdateMock: Dispatch<SetStateAction<boolean>> = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks(); 
    render(<Homepage />)   
  });

  test('renders loading message when loading is true, and renders data when fetch is completed', async () => {
    const mockEventData = [
      { id: '1', name: 'John', surname: 'Doe', email: 'john.doe@example.com', date: new Date() },
      { id: '2', name: 'Jane', surname: 'Doe', email: 'jane.doe@example.com', date: new Date() },
    ];

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockEventData })

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).toBeNull();
      expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
      expect(screen.getByLabelText(/surname/i)).toBeInTheDocument(); 
    });
  });

  test('renders loading message when loading is true, and renders error message if error occurred', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('API error'))
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).toBeNull();
      expect(screen.findByText(/Error occurred when data fetching, please try again later./))
    });
    
  });
});
