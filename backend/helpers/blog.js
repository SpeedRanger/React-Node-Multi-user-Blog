exports.smartTrim = (str, length, delimiter, appendix) => {
  if (str.length <= length) return str;

  var trimmedStr = str.substr(0, length + delimiter.length);

  var lastDelimiterIndex = trimmedStr.lastIndexOf(delimiter);
  if (lastDelimiterIndex >= 0)
    trimmedStr = trimmedStr.substr(0, lastDelimiterIndex);

  if (trimmedStr) trimmedStr += appendix;
  return trimmedStr;
};
