import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getRelativeTime = (date: Date) => dayjs(date).fromNow();
