import crypto from 'crypto';

const SECRET = process.env.DONOR_PORTAL_SECRET || 'default-dev-secret-do-not-use-prod';

/**
 * Generates a signed donor ID string.
 * Format: base64url(name:certNumber:signature)
 */
export function generateSignedDonorId(name: string, certNumber: string): string {
    const data = `${name}:${certNumber}`;
    const signature = crypto
        .createHmac('sha256', SECRET)
        .update(data)
        .digest('hex')
        .substring(0, 16); // 16 chars is enough for short-lived/low-risk links, but full hex is safer. Let's use 32 chars (16 bytes).

    return Buffer.from(`${data}:${signature}`).toString('base64url');
}

/**
 * Verifies and decodes a signed donor ID.
 * Returns the name and certNumber if valid, or null if invalid.
 */
export function verifyDonorId(id: string): { name: string; certNumber: string } | null {
    try {
        const decoded = Buffer.from(id, 'base64url').toString('utf-8');
        const lastColonIndex = decoded.lastIndexOf(':');

        if (lastColonIndex === -1) return null;

        const data = decoded.substring(0, lastColonIndex); // "name:certNumber"
        const signature = decoded.substring(lastColonIndex + 1);

        const expectedSignature = crypto
            .createHmac('sha256', SECRET)
            .update(data)
            .digest('hex')
            .substring(0, 16);

        if (signature !== expectedSignature) {
            console.error('Signature mismatch');
            return null;
        }

        const [name, certNumber] = data.split(':');
        if (!name || !certNumber) return null;

        return { name, certNumber };
    } catch (error) {
        console.error('Failed to verify donor ID:', error);
        return null;
    }
}
