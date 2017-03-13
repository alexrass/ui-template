import moment from 'moment';
import 'moment-timezone';

moment.prototype.toString = function(format = 'lll z') {
  return this.tz(moment.tz.guess()).format(format);
};

export default moment;
