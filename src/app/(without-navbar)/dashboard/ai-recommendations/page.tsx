import TableDemo from '@/components/AIrecomTable';

export default function AiRecommendations() {
    return (
        <div className="flex flex-col items-center justify-center py-6">
            <h1 className="text-2xl font-bold text-center mb-4">
                AI Recommendations
            </h1>
            <TableDemo /> {/* Displaying the table component */}
        </div>
    );
}
