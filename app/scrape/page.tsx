'use client'
import React, { useState } from "react";

export default function Scrape() {
    const [url, setUrl] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [scrapedData, setScrapedData] = useState<{ content: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!url) {
            setError("Please enter a URL");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/scrape', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            // Here you might want to do something with the scraped data, like displaying it
            alert("Scraping completed. Check console for data.");
            setScrapedData(data);
        } catch (error) {
            setError("Failed to scrape the page. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="p-8 grid justify-center gap-4 border rounded">
                    <label className="flex justify-center" htmlFor="url">Enter URL to scrape</label>
                    <input
                        className="px-4 focus:rounded-lg border"
                        type="url"
                        value={url}
                        placeholder="https://www.example.com"
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        className="p-1 border rounded-lg hover:bg-indigo-300"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Scraping...' : 'Scrape'}
                    </button>
                </form>


            </div>
            <div className="flex justify-center">
            <div className="m-4 flex justify-center w-full max-w-5xl border">
                <pre className="w-screen h-screen overflow-x-hidden overflow-y-auto whitespace-pre-wrap break-words">
                    {scrapedData?.content}
                </pre>
            </div>
            </div>
        </>
    )
}