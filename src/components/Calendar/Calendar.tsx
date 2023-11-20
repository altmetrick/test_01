import DateRangePicker from '../DateRangePicker/DateRangePicker';
import OffersList from '../OffersList/OffersList';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { useEffect } from 'react';
import { getOffers } from '../../state/offers/offersSlice';
import { endOfWeek, startOfWeek, format, parseISO } from 'date-fns';

export const Calendar = () => {
  const currentDay = useAppSelector((state) => state.offers.currentDay);
  //const filters = useAppSelector((state) => state.offers.filters);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchOffersOfTheWeekByDay(currentDay);
  }, []);

  const fetchOffersOfTheWeekByDay = (currDay: string) => {
    //Calculate the start and the end of the week to which the currDay belongs

    const start = startOfWeek(parseISO(currDay), { weekStartsOn: 0 });
    const end = endOfWeek(parseISO(currDay), { weekStartsOn: 0 });

    const currFilter = {
      min_date: format(start, 'yyyy-MM-dd'),
      max_date: format(end, 'yyyy-MM-dd'),
    };

    dispatch(getOffers({ currDay, filters: currFilter }));
  };

  return (
    <>
      <DateRangePicker fetchOffers={fetchOffersOfTheWeekByDay} />
      <OffersList />
    </>
  );
};
