import filter from 'leo-profanity';

filter.loadDictionary('ru');
filter.add(filter.getDictionary('en'));
export const cleanMessage = (message) => filter.clean(message);