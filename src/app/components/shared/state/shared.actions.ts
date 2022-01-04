import { createAction } from '@ngrx/store';


export const SHARED_LOADING_START='[SHARED] loading start'
export const SHARED_LOADING_STOP='[SHARED] loading stop'

export const loadingStart=createAction(SHARED_LOADING_START)
export const loadingStop=createAction(SHARED_LOADING_STOP)