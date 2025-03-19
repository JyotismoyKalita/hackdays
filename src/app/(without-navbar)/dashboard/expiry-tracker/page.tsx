import TableDemo from '@/components/expiryTrackerTable';

export default function ExpiryTracker() {
    return (
        <div className="flex flex-col items-center justify-center py-6">
            <h1 className="text-2xl font-bold text-center mb-4">
                Expiry Tracker
            </h1>
            <TableDemo /> {/* Displaying the table component */}
        </div>
    );
}
