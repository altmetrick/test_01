export type GetOffersFilterT = {
  min_date: string;
  max_date: string;
};

//Entities types
export type OfferT = {
  id: number;
  company: number;
  activity: number;
  level: number;
  custom_level: number;
  available: boolean;
  coach_override: boolean;
  coach: number;
  additional_coaches: number[];
  partner_max_booking_count: number;
  establishment: number;
  meta_activity: number;
  credit_price_override: number;
  credit_price: number;
  //"date_start": "2023-11-01T11:15:53+01:00",
  date_start: string;
  duration_minute: number;
  effectif: number;
  establishment_override: boolean;
  recurrence_id: string;
  waiting_list_max_size: number;
  waiting_list_disabled: boolean;
  bookings: any[];
  booking_options: any[];
  meta_activity_color: string;
  tot_slots: number;
  validated_booking_count: number;
  full: boolean;
  is_waiting_list_full: boolean;
  timezone_name: string;
  room_blueprint: null | number;
  coach_payment_rule_id: null | string;
  available_on_partnership: true;
  manager_only: boolean;
  whitelist_tags: number[];
  blacklist_tags: number[];
  group: null | number;
  allow_guest_offer: boolean;
  roll_call_needs_validation: boolean;
  date_roll_call_last_modified: string;
};

export type UserT = {
  name: string;
  first_name: string;
  last_name: string;
  gender: string;
  birthday: null | string;
  photo: string;
};
export type CoachT = {
  id: number;
  user: UserT;
  description: string;
  instagram_url: string;
  facebook_url: string;
  coach_friends: number[];
};

//Location
export type LocationT = {
  address: string;
  address_line_1: string;
  address_line_2: string;
  zipcode: string;
  city: string;
  state: string;
  country: string;
  country_code: string;
};
export type EstablishmentT = {
  id: number;
  title: string;
  cover: null | string;
  location: LocationT;
};

export type MetaActivityT = {
  id: 49;
  name: string;
  description: string;
  //cover_main - url to image
  cover_main: string;
  company: number;

  custom_restriction_rule: any[];
  establishments: { id: number }[];
  first_booking_minutes_until: number;
  images: any[];
  is_broadcast: boolean;
  is_workshop: boolean;
  last_booking_minutes: number;
  last_discard_minutes: number;
  next_slot: string; // date
  ordering_in_category: number;
  parent_category: number;
  rating: string;
  SCT: number;
};

export type BookingT = {
  id: number;
  name: string;
  offer_duration_minute: number;
  member: number;
  consumer: number;
  date: string;
  offer_date_start: string;
  offer: number;
  coach: number;
  level: number;
  meta_activity: number;
};

export type MemberT = {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  gender: string;
  barcode: string;
  date_joined: string;
  membership_ID: string;
  accept_email: boolean;
  email: string;
  consumer: any;
};
