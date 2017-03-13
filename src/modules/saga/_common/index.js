const Base = 'semanticweb';

export const ActionHelpers = {
  forRequestStart: (category, actionType) => `${ Base }/${ category }/${ actionType }/request`,
  forRequestDone: (category, actionType) => `${ Base }/${ category }/${ actionType }/loaded`,
  forRequestError: (category, actionType) => `${ Base }/${ category }/${ actionType }/error`,
};

export const Constants = {
  Data: 'data',
  Error: 'error',
  Loading: 'loading',
};
