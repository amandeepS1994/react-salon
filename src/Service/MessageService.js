import { Subject } from 'rxjs';

const subject = new Subject();

export const messageService = {
    sendMessage: (success, message) => subject.next({isSuccessful: success, text: message }),
    clearMessages: () => subject.next({isSuccessful: false, text: ''}),
    getMessage: () => subject.asObservable()
};