// app/api/gemai/route.ts
import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!GEMINI_API_KEY) {
            return NextResponse.json(
                { error: 'API key missing' },
                { status: 500 }
            );
        }

        const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
            }),
        });

        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;
        return NextResponse.json(reply);
    } catch (error) {
        return NextResponse.json(
            { error: `Failed to fetch response: ${error}` },
            { status: 500 }
        );
    }
}
