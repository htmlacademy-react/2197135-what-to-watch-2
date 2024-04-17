import { State } from '@/types/state';
import { NameSpace } from '@/utils/const';

export const getNotifications = (state: State) =>
  state[NameSpace.Notification].notifications;
