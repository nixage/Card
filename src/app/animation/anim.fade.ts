import { trigger, transition, style, animate, state } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0)' }), animate('300ms', style({ opacity: 1, transform: 'scale(1)' }))]
  ),
  transition(':leave',
    [style({ opacity: 1, transform: 'scale(1)' }), animate('300ms', style({ opacity: 0, transform: 'scale(0)'}))]
  )
]);

export const fadeHeightAnimation = trigger('fadeHeightAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scaleX(0)'}), animate('500ms', style({ opacity: 1, transform: 'scaleX(1)'}))]
  ),
  transition(':leave',
    [style({ opacity: 1, transform: 'scaleX(1)' }), animate('500ms', style({ opacity: 0, transform: 'scaleX(0)'}))]
  )
]);
