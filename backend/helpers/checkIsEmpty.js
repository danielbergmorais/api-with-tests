const isEmpty = (value) => {
  return !value || /^ *$/.test(value) || /^\s*$/.test(value)
}

module.exports = isEmpty
