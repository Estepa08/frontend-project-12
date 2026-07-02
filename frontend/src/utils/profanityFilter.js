import filter from 'leo-profanity';

filter.loadDictionary('ru');

export const cleanMessage = (message) => filter.clean(message);