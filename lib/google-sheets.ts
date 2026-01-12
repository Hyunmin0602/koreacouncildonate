import { google } from 'googleapis';
import { unstable_cache } from 'next/cache';

export interface DonationRow {
    name: string;
    content: string;
    type: string;
    agency: string;
    date: string;
    certNumber: string;
}

export interface SpendingData {
    amount: string;
    usage: string;
    date: string;
    note: string;
}

export interface SpendingRow {
    certNumber: string;
    name: string;
    items: SpendingData[];
}

// 1. Internal Fetcher for Certificate
async function fetchCertificate(certId: string): Promise<DonationRow | null> {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const range = '시트1!A:F';
        const sheetId = process.env.GOOGLE_SHEET_ID;

        if (!sheetId) {
            console.error("Missing GOOGLE_SHEET_ID");
            return null;
        }

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range,
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) return null;

        // Skip header (row 1)
        const dataRows = rows.slice(1);

        // Find row where Column A (Cert Number) matches certId
        // Column Index: 0=CertNum, 1=Name, 2=Content, 3=Type, 4=Agency, 5=Date
        const matchedRow = dataRows.find((row) => row[0] === certId);

        if (!matchedRow) return null;

        return {
            certNumber: matchedRow[0] || '',
            name: matchedRow[1] || '',
            content: matchedRow[2] || '',
            type: matchedRow[3] || '',
            agency: matchedRow[4] || '',
            date: matchedRow[5] || '',
        };

    } catch (error) {
        console.error("Error fetching certificate from sheet:", error);
        return null;
    }
}

// 2. Internal Fetcher for Spending
async function fetchSpending(certId: string): Promise<SpendingRow | null> {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const range = 'money!A:F'; // Extended range to cover more columns if needed
        const sheetId = process.env.GOOGLE_SHEET_ID;

        if (!sheetId) return null;

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range,
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) return null;

        const dataRows = rows.slice(1);
        const matchedRow = dataRows.find((row) => row[0] === certId);

        if (!matchedRow) return null;

        // money sheet columns:
        // A: CertCode, B: Name, C: Amount (CSV), D: Usage (CSV), E: Date (CSV), F: Note (CSV)
        // We need to parse CSVs
        const amounts = matchedRow[2] ? matchedRow[2].split(',').map((s: string) => s.trim()) : [];
        const usages = matchedRow[3] ? matchedRow[3].split(',').map((s: string) => s.trim()) : [];
        const dates = matchedRow[4] ? matchedRow[4].split(',').map((s: string) => s.trim()) : [];
        const notes = matchedRow[5] ? matchedRow[5].split(',').map((s: string) => s.trim()) : [];

        const items: SpendingData[] = amounts.map((amount: string, idx: number) => ({
            amount,
            usage: usages[idx] || '',
            date: dates[idx] || '',
            note: notes[idx] || ''
        }));

        return {
            certNumber: matchedRow[0],
            name: matchedRow[1],
            items
        };

    } catch (error) {
        console.error("Error fetching spending from sheet:", error);
        return null;
    }
}

// 3. Export Cached Versions
export const getCertificateFromSheet = unstable_cache(
    fetchCertificate,
    ['certificate-data'], // Key prefix
    { revalidate: 60, tags: ['certificate'] } // Cache for 60 seconds
);

export const getSpendingData = unstable_cache(
    fetchSpending,
    ['spending-data'], // Key prefix
    { revalidate: 60, tags: ['spending'] } // Cache for 60 seconds
);

// 4. Get Impact Statistics (cached for 1 hour)
export const getImpactStats = unstable_cache(
    async (): Promise<{ totalDonors: number; totalAmount: number } | null> => {
        try {
            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.GOOGLE_CLIENT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
            });

            const sheets = google.sheets({ version: 'v4', auth });
            const sheetId = process.env.GOOGLE_SHEET_ID;

            if (!sheetId) {
                console.error("Missing GOOGLE_SHEET_ID");
                return null;
            }

            // Fetch all donor data
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: sheetId,
                range: '시트1!A:F',
            });

            const rows = response.data.values;
            if (!rows || rows.length <= 1) {
                return { totalDonors: 0, totalAmount: 0 };
            }

            // Count unique donors (excluding header)
            const totalDonors = rows.length - 1;

            // Calculate total amount from "content" column (assuming it contains amount info)
            // This is a placeholder - adjust based on actual data structure
            const totalAmount = 0; // TODO: Parse actual amounts if available in sheets

            return { totalDonors, totalAmount };
        } catch (error) {
            console.error('Error fetching impact stats:', error);
            return null;
        }
    },
    ['impact-stats'],
    {
        revalidate: 3600, // Cache for 1 hour
        tags: ['impact-stats']
    }
);

// 7. Post Guestbook Message
export async function postGuestbookMessage(name: string, message: string): Promise<boolean> {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const sheetId = process.env.GOOGLE_SHEET_ID;

        if (!sheetId) return false;

        const date = new Date().toISOString().split('T')[0];

        // Append to 'guestbook' sheet: Column A: Date, B: Name, C: Message
        await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: 'guestbook!A:C',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[date, name, message]],
            },
        });

        return true;
    } catch (error) {
        console.error('Error posting guestbook message:', error);
        return false;
    }
}

// 8. Get Guestbook Messages
export const getGuestbookMessages = unstable_cache(
    async (): Promise<{ date: string; name: string; message: string }[]> => {
        try {
            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.GOOGLE_CLIENT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });

            const sheets = google.sheets({ version: 'v4', auth });
            const sheetId = process.env.GOOGLE_SHEET_ID;

            if (!sheetId) return [];

            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: sheetId,
                range: 'guestbook!A:C',
            });

            const rows = response.data.values;
            if (!rows || rows.length <= 1) return [];

            // Skip header and reverse to show newest first
            return rows.slice(1).reverse().map(row => ({
                date: row[0] || '',
                name: row[1] || '익명',
                message: row[2] || ''
            }));

        } catch (error) {
            console.error('Error fetching guestbook messages:', error);
            return [];
        }
    },
    ['guestbook-messages'],
    { revalidate: 60, tags: ['guestbook'] } // Cache for 60s, invalidates on new post
);

// 6. Get All Donors (cached for 1 hour)
export const getAllDonors = unstable_cache(
    async (): Promise<{ name: string; date: string }[]> => {
        try {
            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.GOOGLE_CLIENT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
            });

            const sheets = google.sheets({ version: 'v4', auth });
            const sheetId = process.env.GOOGLE_SHEET_ID;

            if (!sheetId) {
                console.error("Missing GOOGLE_SHEET_ID");
                return [];
            }

            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: sheetId,
                range: '시트1!A:F',
            });

            const rows = response.data.values;
            if (!rows || rows.length <= 1) {
                return [];
            }

            // Skip header (row 1) and map
            const allDonors = rows.slice(1).reverse().map(row => ({
                name: row[1] || '익명',
                date: row[5] || '' // Date is in column F (index 5) based on DonationRow interface
            }));

            return allDonors;

        } catch (error) {
            console.error('Error fetching all donors:', error);
            return [];
        }
    },
    ['all-donors'],
    { revalidate: 60, tags: ['donors'] }
);

// 5. Get Recent Donors (cached for 1 hour)
export const getRecentDonors = unstable_cache(
    async (limit: number = 3): Promise<{ name: string; message: string }[]> => {
        try {
            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.GOOGLE_CLIENT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
            });

            const sheets = google.sheets({ version: 'v4', auth });
            const sheetId = process.env.GOOGLE_SHEET_ID;

            if (!sheetId) {
                console.error("Missing GOOGLE_SHEET_ID");
                return [];
            }

            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: sheetId,
                range: '시트1!A:F',
            });

            const rows = response.data.values;
            if (!rows || rows.length <= 1) {
                return [];
            }

            // Skip header and take recent rows (reverse order)
            const recentRows = rows.slice(1).reverse().slice(0, limit);

            return recentRows.map(row => ({
                name: row[1] || '익명', // Name is in column B (index 1)
                message: "따뜻한 마음을 나누어주셔서 감사합니다." // Default message
            }));

        } catch (error) {
            console.error('Error fetching recent donors:', error);
            return [];
        }
    },
    ['recent-donors'],
    { revalidate: 60, tags: ['donors'] }
);
