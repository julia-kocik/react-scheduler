import { useEffect, useState } from 'react';
import EventForm from '../EventForm/EventForm'
import EventList from '../EventList/EventList'
import styles from './Homepage.module.scss'
import axios from 'axios';
import Toast from '../Toast/Toast';
import { showToast } from '../../utils/showToast';
import { apiUrl } from '../../utils/apiUrl';

export interface EventsData {
  id: string;
  name: string;
  surname: string;
  email: string;
  date: Date;
}

export default function Homepage() {
  const [eventsData, setEventsData] = useState<EventsData[]>([]);
  const [forceFetchAfterPost, setForceFetchAfterPost] = useState<boolean>(true);
  const [forceFetchAfterDelete, setForceFetchAfterDelete] = useState<boolean>(true);
  const [forceFetchAfterUpdate, setForceFetchAfterUpdate] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true)
  const [toastInfo, setToastInfo] = useState({message: '', color: 'red'})
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(forceFetchAfterPost || forceFetchAfterDelete || forceFetchAfterUpdate) {
          const response = await axios.get<EventsData[]>(`${apiUrl}/api/v1/event`);
          const data: EventsData[] = response.data; 
          setEventsData(data);
        }
        setLoading(false)
      } catch (error) {
        showToast('Error occurred when data fetching, please try again later.', 'red', setToastInfo)
      } finally {
        setForceFetchAfterPost(false)
        setForceFetchAfterDelete(false)
        setForceFetchAfterUpdate(false)
      }
    };
    fetchData();
  }, [forceFetchAfterPost, forceFetchAfterDelete, forceFetchAfterUpdate]);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        {loading && <Toast color='blue' message='Loading'/>}
        <EventForm setForceFetchAfterPost={setForceFetchAfterPost} toastInfo={toastInfo} setToastInfo={setToastInfo}/>
        <EventList setForceFetchAfterUpdate={setForceFetchAfterUpdate} setForceFetchAfterDelete={setForceFetchAfterDelete} eventsData={eventsData} setToastInfo={setToastInfo}/>
      </div>
    </div>
  )
}
