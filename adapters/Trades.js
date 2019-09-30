import moment from 'moment';

const adaptDateFormat = order => ({ ...order, date: moment(order.date).format('MMM Do YYYY, HH:mm:ss') });

export const adaptData = trades => trades.map(trade => adaptDateFormat(trade));
