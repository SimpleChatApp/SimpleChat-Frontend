import { Injectable } from '@angular/core';
import * as Sentry from '@sentry/angular';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor() { }

  notify(message: string): void{
    this.checkPermission();

    if (Notification.permission === 'granted') {
      let notification = new Notification('Simple Chat', {
        image: '',
        icon: 'https://avatars.githubusercontent.com/u/76535822?s=200&v=4',
        body: message
      });

      notification.addEventListener('error', event => {
        Sentry.captureException(event);
      });

      notification.addEventListener('click', event => {
        notification.close();

        console.log(event);

        // if (event..action === 'archive') {
        //   alert('button clicked!');
        // } else {
        //   alert('clicked!');
        // }

      });

      notification.addEventListener('close', event => {
      });

      notification.addEventListener('show', event => {
      });
    }
  }

  private checkPermission(): void{
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
      return;
    }

    if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }
}
