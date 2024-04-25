import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import pt from 'dayjs/locale/pt';

dayjs.extend(relativeTime)
	.locale(pt)

export {dayjs};
