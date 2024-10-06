import { chromium } from '@playwright/test';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();

        const browser = await chromium.launch({
            headless: true
        });
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(url);

        const content = await page.content();

        await browser.close();

        return NextResponse.json({ content });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to scrape the page' }, { status: 500 });
    }
}

export async function OPTIONS(request: NextRequest) {
    return NextResponse.json({ message: 'OPTIONS method called' });
}