import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../api/axios-instance';
import { BookingT, MemberT } from '../../types';

type SingleBookingPropsT = {
  id: number;
};

export const SingleBooking: React.FunctionComponent<SingleBookingPropsT> = ({ id }) => {
  const [booking, setBooking] = useState<null | BookingT>(null);
  const [member, setMember] = useState<null | MemberT>(null);

  useEffect(() => {
    const getBooking = async (id: number) => {
      try {
        const { data } = await axiosInstance.get<BookingT>(`booking/${id}`);

        setBooking(data);
      } catch (error) {
        console.log(error);
      }
    };

    getBooking(id);
  }, []);

  useEffect(() => {
    const getMember = async (id: number) => {
      try {
        const { data } = await axiosInstance.get<MemberT>(`/member/${id}`);

        setMember(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (booking?.member) {
      getMember(booking?.member);
    }
  }, [booking]);

  return <div>{member?.name}</div>;
};
