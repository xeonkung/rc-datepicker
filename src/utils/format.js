import moment from 'moment';

export default function format(Component) {

  Component.prototype.getDisplayFormat = function(props) {
    const { displayFormat, fixedMode, startMode } = (props || this.props);
    if (displayFormat) {
      return displayFormat;
    }
    if (fixedMode) {
      switch (startMode) {
        case 'day':
          return 'DD';
        case 'month':
          return 'MMMM';
        case 'year':
          return 'YYYY';
      }
    }

    return 'L';
  };

  Component.prototype.formatReturnedDate = function(date, props) {
    const { returnFormat, useBe } = (props || this.props);
    if (useBe) {
      const ce = moment(date).add(543, 'y');
      return ce.format(returnFormat);
    } else {
      return date.format(returnFormat);
    }
  };

  Component.prototype.formatDisplayedDate = function(date, props) {
    const { useBe } = props || this.props;
    if (useBe) {
      const ce = moment(date).add(543, 'y');
      return ce.format(this.getDisplayFormat(props));
    } else {
      return date.format(this.getDisplayFormat(props));
    }
  };

  Component.prototype.parsePropDateString = function(dateString, props) {
    const { returnFormat, useBe } = props || this.props;
    const m = returnFormat
      ? moment(dateString, returnFormat, true)
      : moment(dateString);
    return useBe ? m.add(-543, 'y') : m;
  };

  Component.prototype.parseInputDateString = function(dateString, props) {
    const format = this.getDisplayFormat(props);
    const { useBe } = props || this.props;
    const m = format
      ? moment(dateString, format, true)
      : moment(dateString);
    return useBe ? m.add(-543, 'y') : m;
  };

}
