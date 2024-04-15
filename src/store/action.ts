import { AppRoute } from '@/utils/const';
import { createAction } from '@reduxjs/toolkit';

export const redirectToRouteAction = createAction<AppRoute>('redirectToRoute');
