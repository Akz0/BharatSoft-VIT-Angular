import { SharedState } from './shared.model';
import { createFeatureSelector, createSelector } from "@ngrx/store";


export const SHARED_STATE_NAME='shared'


const sharedSelector=createFeatureSelector<SharedState>(SHARED_STATE_NAME)

export const getLoader=createSelector(sharedSelector,state=>state?.isLoading)