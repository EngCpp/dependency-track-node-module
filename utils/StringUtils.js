isEmpty = (value) => {
  return (typeof value == 'string' && !value.trim()) ||
         (Array.isArray(value) && value.length <= 0) ||
          typeof value == 'undefined' || value === null;
}

exports.isEmpty = isEmpty
exports.isNotEmpty = !isEmpty
