import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '../store';
import { axiosInstance } from '../../api/axios-instance';
import { GetOffersFilterT, OfferT } from '../../types';
import { isSameDay, parseISO } from 'date-fns';

type initialOffersState = {
  offersEntities: OfferT[] | null;
  currentDay: string;
  filters: GetOffersFilterT | null;
  status: 'idle' | 'loading' | 'success';
  error: null | Error | string;
};

const today = new Date().toISOString();

const initialState = {
  offersEntities: [],
  currentDay: today,
  filters: null,
  status: 'idle',
  error: null,
} as initialOffersState;

//Res Types
type GetOffersResT = {
  links: {
    next: null | string;
    previous: null | string;
  };
  next_page: null | string;
  page: number;
  count: number;
  results: OfferT[];
};

//Thunks:

export const getOffers = createAsyncThunk(
  'offers/GetOffers',
  async ({ currDay, filters }: { currDay: string; filters: GetOffersFilterT }, thunkApi) => {
    thunkApi.dispatch(setCurrentDay(currDay));
    thunkApi.dispatch(changeFilters(filters));
    try {
      const { data } = await axiosInstance.get<GetOffersResT>(
        `/offer?company=6&min_date=${filters['min_date']}&max_date=${filters['max_date']}`
      );

      return data;
    } catch (err) {
      const error: AxiosError<any> = err as any;
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }
      throw err;
    }
  }
);

//Slice

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCurrentDay: (state, action) => {
      state.currentDay = action.payload;
    },
    changeFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //getOffers
      .addCase(getOffers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        state.offersEntities = action.payload.results;
        state.status = 'success';
      })
      .addCase(
        getOffers.rejected,
        (state, { payload }: PayloadAction<{ message: string } | any>) => {
          state.error = payload.message;
        }
      );
  },
});

//Selectors:

export const selectOffersByDay = (day: string) => {
  return (state: RootState) =>
    state.offers.offersEntities?.filter((offer) => {
      return isSameDay(parseISO(day), parseISO(offer.date_start));
    });
};

//Actions
export const { setCurrentDay, changeFilters } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
