import { Notification } from '@/types/notification';
import { NameSpace } from '@/utils/const';
import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';

type NotificationSlice = {
  notifications: Notification[];
};

const initialState: NotificationSlice = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: NameSpace.Notification,
  initialState,
  reducers: {
    pushNotification: (
      state,
      action: PayloadAction<Omit<Notification, 'id'>>
    ) => {
      const id = nanoid();
      state.notifications.push({ id, ...action.payload });
    },
    clearNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { pushNotification, clearNotification } =
  notificationSlice.actions;
