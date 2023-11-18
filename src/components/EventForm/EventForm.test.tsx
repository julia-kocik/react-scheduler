import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import EventForm from './EventForm';


describe('EventForm', () => {
  const setForceFetchAfterPostMock = jest.fn();
  const setToastInfoMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <EventForm
        setForceFetchAfterPost={setForceFetchAfterPostMock}
        toastInfo={{ message: '', color: '' }}
        setToastInfo={setToastInfoMock}
      />
    );
  });

  test('renders EventForm component', () => {
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/surname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  test('handles form submission successfully', async () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce({data: {}})
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/surname/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2023-12-01' } });

    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => {
      expect(setForceFetchAfterPostMock).toHaveBeenCalledWith(true);
      expect(setToastInfoMock).toHaveBeenCalledWith({ message: 'Event successfully created!', color: 'green' });
    });
  });

  test('handles form submission with empty fields', async () => {
    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => {
      expect(setToastInfoMock).toHaveBeenCalledWith({
        message: 'Please fill in the following fields: name, surname, email, date.',
        color: 'red',
      });
    });
  });

  test('handles form submission with invalid email', async () => {
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/surname/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2023-12-01' } });
    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => {
      expect(setToastInfoMock).toHaveBeenCalledWith({ message: 'Please provide valid email', color: 'red' });
    });
  });

  test('handles form submission with API error', async () => {
    jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('API error'))

    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/surname/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2023-12-01' } });

    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => {
      expect(setToastInfoMock).toHaveBeenCalledWith({
        message: 'Error occurred when data submitting, please try again later.',
        color: 'red',
      });
    });
  });
});
