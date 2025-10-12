import crypto from 'crypto';

export default function generateRandomString(length) {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    const bytes = crypto.randomBytes(length);
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters[bytes[i] % characters.length];
    }
    return result;
}
