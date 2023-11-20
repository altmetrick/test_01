import styles from './SingleOffer.module.css';

import { useEffect, useState } from 'react';
import { CoachT, EstablishmentT, MetaActivityT, OfferT } from '../../types';
import { axiosInstance } from '../../api/axios-instance';

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

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles['offer_card']}`}>
      <div className={`${styles['offer_card__img-box']}`}>
        <img
          className={`${styles['img']}`}
          src={activity?.cover_main}
          alt={`${activity?.name} activity`}
        />
      </div>

      <div>
        <div>
          Activity: {activity?.name} <span>level: {offer.level}</span>
        </div>
        <div>Coach: {coach?.user.name}</div>

        <div>{establishment ? establishment.location.address_line_1 : ' '}</div>
      </div>
    </div>
  );
};

export default SingleOffer;
