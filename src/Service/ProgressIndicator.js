import { Subject } from "rxjs";

const subject = new Subject();

export const progressService = {
    startProgress: (value, progressValue) => subject.next({ initiate: value, progress: progressValue}),
    stopProgress: (value, progressValue) => subject.next({ initiate: value, progress: progressValue}),
    getProgress: () => subject.asObservable()
};