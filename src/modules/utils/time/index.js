const secondsWrapper = (num, timeGranularity) => moment.duration(num, timeGranularity).as('seconds');

/**
 * Retrieve a relative time
 * @param   {moment}    time  Time to generate relative time for
 * @return  {String}          Relative time
 */
export function timeAgo(time) {
  const currentTime = moment();
  const timeDelta = currentTime.diff(time, 'seconds');

  if (!time.isValid()) {
    return null;
  }

  if (timeDelta < secondsWrapper(20, 'seconds')) {
    return `${timeDelta}s ago`;
  } else if (timeDelta < secondsWrapper(1, 'minute')) {
    return 'less than a minute ago';
  } else if (timeDelta < secondsWrapper(2, 'minutes')) {
    return 'about a minute ago';
  } else if (timeDelta < secondsWrapper(45, 'minutes')) {
    return `${(_.parseInt(timeDelta / 60)).toString()} minutes ago`;
  } else if (timeDelta < secondsWrapper(1.5, 'hours')) {
    return 'about an hour ago';
  } else if (timeDelta < secondsWrapper(1, 'day')) {
    return `about ${(_.parseInt(timeDelta / secondsWrapper(1, 'hour'))).toString()} hours ago`;
  } else if (timeDelta < secondsWrapper(2, 'days')) {
    return '1 day ago';
  } else if (timeDelta < secondsWrapper(4, 'days')) {
    return `${(_.parseInt(timeDelta / secondsWrapper(1, 'day'))).toString()} days ago`;
  } else if (time.year() === currentTime.year()) {
    return time.format('D MMM');
  } else {
    return time.format('LL');
  }
}
