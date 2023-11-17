const sanitizeHtml = require('sanitize-html');
const validator = require('validator');

// Helper function to sanitize and validate input
// this is the validator and sanitizer of the input of the user
const sanitizeAndValidate = (input, validationRules) => {

    // clean multiple spaces
    const cleanedInput = input.replace(/\s+/g, ' ');

    const sanitizedInput = sanitizeHtml(cleanedInput.trim());

    for (const rule of validationRules) {
        if (!rule.validator(sanitizedInput)) {
            return false;
        }
    }

    return sanitizedInput;
};

// in array
const sanitizeAndValidateArray = (addStaffAccount, validationRules) => {
    const sanitizedAndValidatedArray = [];

    for (const input of addStaffAccount) {
        const sanitizedInput = sanitizeAndValidate(input, validationRules);
        if (sanitizedInput !== false) {
            sanitizedAndValidatedArray.push(sanitizedInput);
        }
    }

    return sanitizedAndValidatedArray;
};

module.exports = { sanitizeAndValidate, sanitizeAndValidateArray };