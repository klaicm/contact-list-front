import { trigger, transition, style, animate, state } from '@angular/animations';

export const Animations = {
  enterLeaveTriggerAllContacts: trigger('enterLeaveTriggerAllContacts', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'translateX(-100%)' }),
      animate(200)
    ]),
    transition('* => void', [
      animate(200, style({ transform: 'translateX(-100%)' }))
    ])
  ]),

  enterLeaveTriggerFavoriteContacts: trigger('enterLeaveTriggerFavoriteContacts', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'translateX(100%)' }),
      animate(200)
    ]),
    transition('* => void', [
      animate(200, style({ transform: 'translateX(100%)' }))
    ])
  ]),

  dropErrMsg: trigger('dropErrMsg', [
    state('in', style({ transform: 'translateY(0)' })),
    transition('void => *', [
      style({ transform: 'translateY(-50%)' }),
      animate(200)
    ]),
    transition('* => void', [
      animate(200, style({ transform: 'translateY(-50%)' }))
    ])
  ]),

  enterLeaveTriggerFilter: trigger('enterLeaveTriggerFilter', [
    state('in',
      style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'translateX(-100%)' }),
      animate(80)
    ]),
    transition('* => void', [
      animate(80, style({ transform: 'translateX(-100%)' }))
    ])
  ])
};
