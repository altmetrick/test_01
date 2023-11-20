import styles from './OffersList.module.css';
import { useAppSelector } from '../../state/store';
import { selectOffersByDay } from '../../state/offers/offersSlice';
import SingleOffer from '../SingleOffer/SingleOffer';

const OffersList = () => {
  const currentDay = useAppSelector((state) => state.offers.currentDay);
  const offers = useAppSelector(selectOffersByDay(currentDay));
  // console.log(offers);

  if (offers === undefined || offers.length === 0) {
    return (
      <div>
        <h3>There're no offers this day</h3>
      </div>
    );
  }

  const renderedOffers = offers.map((offer) => <SingleOffer key={offer.id} offer={offer} />);

  return <div className={styles['offers_list']}>{renderedOffers}</div>;
};

export default OffersList;
