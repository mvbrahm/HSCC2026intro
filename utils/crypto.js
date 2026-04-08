const crypto = require('crypto');

/**
 * Crypto utility functions for user authentication
 */

/**
 * Generate a random salt
 * @returns {string} Random salt
 */
function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}

/**
 * Generate a key from password and salt using PBKDF2
 * @param {string} password - User password
 * @param {string} salt - Salt for hashing
 * @returns {string} Generated key
 */
function generateKey(password, salt) {
    // Using 100,000 iterations as specified in API documentation
    return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

/**
 * Hash a password with salt
 * @param {string} password - Password to hash
 * @returns {object} Object containing salt and key
 */
function hashPassword(password) {
    const salt = generateSalt();
    const key = generateKey(password, salt);
    return { salt, key };
}

/**
 * Verify a password against stored salt and key
 * @param {string} password - Password to verify
 * @param {string} salt - Stored salt
 * @param {string} storedKey - Stored key
 * @returns {boolean} True if password is valid
 */
function verifyPassword(password, salt, storedKey) {
    const key = generateKey(password, salt);
    return key === storedKey;
}

module.exports = {
    generateSalt,
    generateKey,
    hashPassword,
    verifyPassword
};