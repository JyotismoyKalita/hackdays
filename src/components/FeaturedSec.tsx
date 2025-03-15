import React from 'react';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import {
    IconArrowWaveRightUp,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from '@tabler/icons-react';

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
            'The  stockthat should be kept by the Owner is recommended by AI to preventexcess stock and wastage.',
        header: (
            <img
                src="http://localhost:3000/stock copy.jpg"
                alt=""
                className="w-65 h-37"
            />
        ),
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: 'AI Recomended Products ',
        description:
            'Based on trends, AI wouldrecommend new products not currently in the stock to improveprofit of the business.',
        header: (
            <img
                src="http://localhost:3000/products copy.jpg"
                alt=""
                className="w-65 h-37"
            />
        ),
        icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: 'AI recomended Dynamic Pricing',
        description: 'Discover the beauty of thoughtful and functional design.',
        header: (
            <img
                src="http://localhost:3000/pexels-pixabay-259027 copy.jpg"
                alt=""
                className="w-65 h-37"
            />
        ),
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: 'AI Recomended discontinuation of a particular item',
        description:
            'Based on demands and sale, AI would recommend what items to not reorder for next batch of stock.',
        header: (
            <img
                src="http://localhost:3000/need2 copy.jpg"
                alt=""
                className="w-full h-45"
            />
        ),
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },

    {
        title: 'Expiry Tracker',
        description:
            ' Expiry dates of products which can expire is tracked and when they are about to expire, the owner is alerted,making it easier for the owner to know about the currently expiring products.',
        header: (
            <img
                src="http://localhost:3000/warning copy.jpg"
                alt=""
                className="w-65 h-27"
            />
        ),
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
];
export default BentoGridDemo;
