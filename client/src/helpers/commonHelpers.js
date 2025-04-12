import moment from "moment";

// Default date format used across the application
const defaultDateFormate = "MM-DD-YYYY";

/**
 * Formats a given date to the default format (MM-DD-YYYY).
 * Returns null if the date is empty or invalid.
 *
 * @param {string|Date} date - The date to format.
 * @returns {string|null} - Formatted date string or null.
 */
const setFormatDate = (date) => {
  return date && date != "" ? moment(date).format(defaultDateFormate) : null;
};

/**
 * Finds the corresponding option(s) from a list based on the provided value(s).
 * Useful for setting default selected values in dropdowns or selects.
 *
 * @param {Array} options - List of option objects, each having a `value` property.
 * @param {string|number|Array} value - Single value or array of values to match.
 * @returns {Object|Array|null} - Matching option(s) or null if not found.
 */
const defaultValue = (options, value) => {
  if (!options || !value) return null;
  // If value is a primitive (string or number), return single matching object
  if (typeof value === "string" || typeof value === "number") {
    return (
      options.find((opt) => opt.value.toString() === value.toString()) || null
    );
  }
  // If value is an array, return all matching objects
  if (Array.isArray(value)) {
    return options.filter((opt) =>
      value.map((v) => v.toString()).includes(opt.value.toString())
    );
  }
  return null;
};

export { setFormatDate, defaultValue };
