import React from 'react';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import {
    IconArrowWaveRightUp,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from '@tabler/icons-react';
import Image from 'next/image';

export function BentoGridDemo() {
    return (
        <BentoGrid className="max-w-4xl mt-10">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
                />
            ))}
        </BentoGrid>
    );
}

const items = [
    {
        title: 'AI Recomended Stock Level',
        description:
            'The stockthat should be kept by the Owner is recommended by AI to prevent excess stock and wastage.',
        header: (
            <Image
                src="https://t32a2y5k3v.ufs.sh/f/OUOWSzRtzb8nQS7vwDT7a4KYM2J5E9dUiCD0gzpbNWQrZyvR"
                alt="Stock level visualization"
                width={650}
                height={370}
                className="w-full h-36"
            />
        ),
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: 'AI Recomended Products ',
        description:
            'Based on trends, AI would recommend new products not currently in the stock to improve profit of the business.',
        header: (
            <Image
                src="https://t32a2y5k3v.ufs.sh/f/OUOWSzRtzb8njaXv4GdEzudUkDcNv1i8qr3HLYgmZtsbF5P9"
                alt="Product recommendations"
                width={650}
                height={370}
                className="w-full h-36"
            />
        ),
        icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: 'AI recomended Dynamic Pricing',
        description: 'Discover the beauty of thoughtful and functional design.',
        header: (
            <Image
                src="https://t32a2y5k3v.ufs.sh/f/OUOWSzRtzb8nQnDbVosT7a4KYM2J5E9dUiCD0gzpbNWQrZyv"
                alt="Dynamic pricing chart"
                width={650}
                height={370}
                className="w-full h-36"
            />
        ),
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: 'AI Recomended discontinuation of a particular item',
        description:
            'Based on demands and sale, AI would recommend what items to not reorder for next batch of stock.',
        header: (
            <Image
                src="https://t32a2y5k3v.ufs.sh/f/OUOWSzRtzb8neufMIp7fYUs1B9xOHygtKle7qoQCGEv620cp"
                alt="Item discontinuation recommendation"
                width={650}
                height={450}
                className="w-full h-40"
            />
        ),
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },

    {
        title: 'Expiry Tracker',
        description:
            'Expiry dates of products which can expire is tracked and when they are about to expire, the owner is alerted, making it easier for the owner to know about the currently expiring products.',
        header: (
            <Image
                src="https://t32a2y5k3v.ufs.sh/f/OUOWSzRtzb8nHTDnNDsktd10pDUvHuYPEnq32wS9jbIgio4B"
                alt="Expiry tracker alert"
                width={650}
                height={270}
                className="w-full h-28"
            />
        ),
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
];
export default BentoGridDemo;
