import { loadingStart, loadingStop } from './shared.actions';
import { initSharedState } from './shared.state';
import { createReducer ,on} from '@ngrx/store';


const _sharedReducer=createReducer(initSharedState,
    on(loadingStart,state=>{
        return {
            ...state,
            isLoading:true
        }
    }),
    on(loadingStop,state=>{
        return {
            ...state,
            isLoading:false
        }
    }))    

export function sharedReducer(state:any,action:any) {
    return _sharedReducer(state,action)
}