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
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
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
        const amounts = matchedRow[2] ? matchedRow[2].split(',').map(s => s.trim()) : [];
        const usages = matchedRow[3] ? matchedRow[3].split(',').map(s => s.trim()) : [];
        const dates = matchedRow[4] ? matchedRow[4].split(',').map(s => s.trim()) : [];
        const notes = matchedRow[5] ? matchedRow[5].split(',').map(s => s.trim()) : [];

        const items: SpendingData[] = amounts.map((amount, idx) => ({
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
