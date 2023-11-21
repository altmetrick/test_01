import styles from './SingleOffer.module.css';

import { useEffect, useState } from 'react';
import { CoachT, EstablishmentT, MetaActivityT, OfferT } from '../../types';
import { axiosInstance } from '../../api/axios-instance';
import ShowBookings from '../ShowBookings/ShowBookings';

type SingleOfferPropsT = {
  offer: OfferT;
};

const SingleOffer: React.FunctionComponent<SingleOfferPropsT> = ({ offer }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const [activity, setActivity] = useState<MetaActivityT | null>(null);
  const [coach, setCoach] = useState<CoachT | null>(null);
  const [establishment, setEstablishment] = useState<EstablishmentT | null>(null);

  useEffect(() => {
    const getData = async () => {
      setStatus('loading');

      const activityInfoPromise = axiosInstance.get<MetaActivityT>(
        `/meta-activity/${offer.meta_activity}`
      );
      const coachInfoPromise = axiosInstance.get<CoachT>(`/coach/${offer.coach}`);

      const establishmentInfoPromise = axiosInstance.get<EstablishmentT>(
        `/establishment/${offer.establishment}`
      );

      const allData = await Promise.all([
        activityInfoPromise.catch((error) => console.log(error)),
        coachInfoPromise.catch((error) => console.log(error)),
        establishmentInfoPromise.catch((error) => console.log(error)),
      ]);

      setActivity(allData[0]?.data || null);
      setCoach(allData[1]?.data || null);
      setEstablishment(allData[2]?.data || null);

      setStatus('success');
    };
    getData();
  }, [offer]);

  if (status === 'loading') return <div>Loading</div>;

  return (
    <div className={`${styles['offer_card']}`}>
      <div className={`${styles['offer_card__img-box']}`}>
        <img
          className={`${styles['img']}`}
          src={activity?.cover_main}
          alt={`${activity?.name} activity`}
        />
      </div>

      <div className={`${styles['offer_card__info']}`}>
        <div>
          <div className={styles['info__activity']}>
            <span className={styles['activity__name']}>{activity?.name}</span>
            <span className={styles['activity__level']}>level: {offer.level}</span>
          </div>
          <div>coach: {coach?.user.name}</div>

          <div>{establishment ? `location: ${establishment.location.address_line_1}` : ' '}</div>
        </div>

        <ShowBookings bookingsIds={offer.bookings} />
      </div>
    </div>
  );
};

export default SingleOffer;
