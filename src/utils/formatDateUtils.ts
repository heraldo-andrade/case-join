import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.locale('pt-br')
dayjs.extend(utc)
dayjs.extend(timezone)

export const formatDate = (date = new Date(), format = "DD/MM/YYYY HH:mm") => {
	return dayjs(date).utc().format(format);
}