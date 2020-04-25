isEmpty = (value) => {
  return (typeof value == 'string' && !value.trim()) ||
         (Array.isArray(value) && value.length <= 0) ||
          typeof value == 'undefined' || value === null;
}

isNotEmpty = v => !isEmpty(v);

exports.isEmpty = isEmpty
exports.isNotEmpty = isNotEmpty
