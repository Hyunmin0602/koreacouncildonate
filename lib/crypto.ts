import crypto from 'crypto';

// 암호화 키 (환경변수에서 가져오거나 기본값 사용)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'donateds-secret-key-32chars!!';
const ALGORITHM = 'aes-256-cbc';

// 키를 32바이트로 맞추기
const key = crypto.createHash('sha256').update(ENCRYPTION_KEY).digest();

/**
 * 인증번호를 암호화합니다
 */
export function encryptId(id: string): string {
    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

        let encrypted = cipher.update(id, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // IV와 암호화된 데이터를 합쳐서 반환 (URL-safe base64)
        const combined = iv.toString('hex') + ':' + encrypted;
        return Buffer.from(combined).toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Failed to encrypt ID');
    }
}

/**
 * 암호화된 인증번호를 복호화합니다
 */
export function decryptId(encryptedId: string): string {
    try {
        // URL-safe base64 디코딩
        const base64 = encryptedId
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        // 패딩 추가
        const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
        const combined = Buffer.from(padded, 'base64').toString('utf8');

        const parts = combined.split(':');
        if (parts.length !== 2) {
            throw new Error('Invalid encrypted ID format');
        }

        const iv = Buffer.from(parts[0], 'hex');
        const encrypted = parts[1];

        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Invalid or corrupted certificate ID');
    }
}
