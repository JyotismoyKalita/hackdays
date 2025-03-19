import TableDemo from '@/components/table1';

export default function AiStockLevels() {
    return (
        <div className="flex flex-col items-center justify-center py-6">
            <h1 className="text-2xl font-bold text-center mb-4">
                AI Stock Levels
            </h1>
            <TableDemo /> {/* Displaying the table component */}
        </div>
    );
}
