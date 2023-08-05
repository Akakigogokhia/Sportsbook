import { Injectable } from '@angular/core';
import { PreiodResult } from 'src/app/shared/models/market.model';

interface eventChecker {
  [name: string]: {
    checkStatus: (
      position: string,
      fullTimeResults: PreiodResult,
      firstHalfResults?: PreiodResult
    ) => boolean;
  };
}

@Injectable({
  providedIn: 'root',
})
export class specialEventsChecker {
  events: eventChecker = {
    'Both Teams To Score/Total Goals': {
      checkStatus: () => true,
    },
  };
}
