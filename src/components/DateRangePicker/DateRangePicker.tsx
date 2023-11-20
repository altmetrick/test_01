import styles from './DateRangePicker.module.css';
import { useEffect, useState } from 'react';
import {
  startOfWeek,
  endOfWeek,
  format,
  eachDayOfInterval,
  subWeeks,
  addWeeks,
  isSameDay,
  parseISO,
} from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { setCurrentDay } from '../../state/offers/offersSlice';

type DayPropsT = {
  date: Date;
  isPicked: boolean;
  pickCurrentDay: (day: string) => void;
};

const Day: React.FunctionComponent<DayPropsT> = (props) => {
  const { date, isPicked, pickCurrentDay } = props;
  return (
    <div className={styles.day} onClick={() => pickCurrentDay(date.toISOString())}>
      <div className={styles['day__word']}>{format(date, 'iiii')}</div>
      <div className={`${styles['day__number']} ${isPicked ? styles['day--picked'] : ''}`}>
        {format(date, 'dd')}
      </div>
    </div>
  );
};

type DateRangePickerPropsT = {
  fetchOffers: (day: string) => void;
};

const DateRangePicker: React.FunctionComponent<DateRangePickerPropsT> = ({ fetchOffers }) => {
  const dispatch = useAppDispatch();

  const currentDay = useAppSelector((state) => state.offers.currentDay);

  const [weekStart, setWeekStart] = useState<'' | Date>('');
  const [weekEnd, setWeekEnd] = useState<'' | Date>('');

  useEffect(() => {
    updateWeek(currentDay);
  }, []);

  function updateWeek(day: string) {
    const start = startOfWeek(parseISO(day), { weekStartsOn: 0 });
    const end = endOfWeek(parseISO(day), { weekStartsOn: 0 });

    setWeekStart(start);
    setWeekEnd(end);
  }

  const goToPreviousWeek = () => {
    const newCurrentDay = subWeeks(parseISO(currentDay), 1).toISOString();

    fetchOffers(newCurrentDay);
    updateWeek(newCurrentDay);
  };
  const goToNextWeek = () => {
    const newCurrentDay = addWeeks(parseISO(currentDay), 1).toISOString();

    fetchOffers(newCurrentDay);
    updateWeek(newCurrentDay);
  };

  const pickCurrentDay = (date: string) => {
    dispatch(setCurrentDay(date));
  };

  const displayFormat = 'EEE dd/MM';

  let renderedDays;
  if (weekStart && weekEnd) {
    renderedDays = eachDayOfInterval({
      start: weekStart,
      end: weekEnd,
    }).map((day) => {
      const isPicked = isSameDay(day, parseISO(currentDay));

      return (
        <Day
          key={day.toISOString()}
          date={day}
          pickCurrentDay={pickCurrentDay}
          isPicked={isPicked}
        />
      );
    });
  }

  return (
    <div className={styles.date_picker}>
      {/* Date picker change week */}
      {weekStart && weekEnd && (
        <div className={styles.actions}>
          <button onClick={goToPreviousWeek} className={styles.actions__btn}>
            {'<'}
          </button>
          <div>
            {format(weekStart, displayFormat)} - {format(weekEnd, displayFormat)}
          </div>
          <button onClick={goToNextWeek} className={styles.actions__btn}>
            {'>'}
          </button>
        </div>
      )}

      {/* List of rendered days */}
      <div className={styles.days_list}>{renderedDays}</div>
    </div>
  );
};

export default DateRangePicker;
