import TableDemo from '@/components/aiDynamicPrice';

export default function AiDynamicPricing() {
    return (
        <div className="flex flex-col items-center justify-center py-6 max-h-175">
            <h1 className="text-2xl font-bold text-center mb-4  text-teal-600">
                AI Dynamic Pricing
            </h1>
            <TableDemo /> {/* Displaying the table component */}
        </div>
    );
}
