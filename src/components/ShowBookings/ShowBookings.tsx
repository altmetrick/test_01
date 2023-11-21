import styles from './ShowBookings.module.css';
import { useEffect, useRef, useState } from 'react';
import { SingleBooking } from '../SingleBooking/SingleBooking';

type ShowBookingsPropsT = {
  bookingsIds: number[];
};

const ShowBookings: React.FC<ShowBookingsPropsT> = ({ bookingsIds }) => {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!divEl.current) return;

      if (!divEl.current?.contains(e.target as Node)) {
        setIsOpen(false);
      } else {
        console.log('inside');
      }
    };

    document.addEventListener('click', handler, true);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  let content;

  if (bookingsIds.length === 0) {
    content = <div>There're no bookings</div>;
  }

  if (bookingsIds.length) {
    content = (
      <>
        <div>Attendees:</div>
        {bookingsIds.map((id) => (
          <SingleBooking key={id} id={id} />
        ))}
      </>
    );
  }

  return (
    <div ref={divEl} onClick={toggleIsOpen} className={styles['show_bookings']}>
      <div className={styles['show_bookings__action']}> {isOpen ? 'Close' : 'Show Bookings'}</div>
      {isOpen && <div className={styles['show_bookings__content']}>{content}</div>}
    </div>
  );
};

export default ShowBookings;
