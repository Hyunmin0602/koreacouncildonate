import { google } from 'googleapis';

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
}

export interface SpendingRow {
    certNumber: string;
    name: string;
    items: SpendingData[];
}

export async function getCertificateFromSheet(certId: string): Promise<DonationRow | null> {
    try {
        // 1. Auth
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // 2. Fetch Data
        // Fetching Columns A to F
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
        if (!rows || rows.length === 0) {
            return null;
        }

        // 3. Find the row matching the specific ID
        // Column Mapping based on User Screenshot:
        // A (0): 인증서 코드 (Cert Number)
        // B (1): 이름 (Name)
        // C (2): 내용 (Content)
        // D (3): 후원구분 (Type)
        // E (4): 발급기관 (Agency)
        // F (5): 후원일 (Date)

        // We search for the certID in Column A (index 0)
        const matchedRow = rows.find((row) => row[0]?.toString().trim() === certId.toString().trim());

        if (!matchedRow) return null;

        return {
            name: matchedRow[1] || '정보 없음', // Column B
            content: matchedRow[2] || '정보 없음', // Column C
            type: matchedRow[3] || '정보 없음', // Column D
            agency: matchedRow[4] || '정보 없음', // Column E
            date: matchedRow[5] || '정보 없음', // Column F
            certNumber: matchedRow[0] || certId, // Column A
        };

    } catch (error) {
        console.error('Google Sheets API Error:', error);
        return null;
    }
}

export async function getSpendingData(certId: string): Promise<SpendingRow | null> {
    try {
        // 1. Auth
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // 2. Fetch Data from 'money' tab
        // Fetching Columns A to D
        // A: Cert Code
        // B: Name
        // C: Amount (comma separated)
        // D: Usage (comma separated)
        const range = 'money!A:D';
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
        if (!rows || rows.length === 0) {
            return null;
        }

        // 3. Find the row matching the specific ID
        const matchedRow = rows.find((row) => row[0]?.toString().trim() === certId.toString().trim());

        if (!matchedRow) return null;

        const name = matchedRow[1] || '';
        const rawAmounts = matchedRow[2] || '';
        const rawUsages = matchedRow[3] || '';

        // 4. Parse CSV data
        const amounts = rawAmounts.split(',').map((s: string) => s.trim());
        const usages = rawUsages.split(',').map((s: string) => s.trim());

        const items: SpendingData[] = [];
        const maxLength = Math.max(amounts.length, usages.length);

        for (let i = 0; i < maxLength; i++) {
            if (amounts[i] || usages[i]) {
                items.push({
                    amount: amounts[i] || '0',
                    usage: usages[i] || '내역 없음',
                });
            }
        }

        return {
            certNumber: matchedRow[0] || certId,
            name,
            items,
        };

    } catch (error) {
        console.error('Google Sheets API Error (Spending):', error);
        return null;
    }
}
