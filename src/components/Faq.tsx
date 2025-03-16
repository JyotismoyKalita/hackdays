'use client';

import { FaqSectionWithCategories } from '@/components/blocks/faq-with-categories';

const DEMO_FAQS = [
    {
        question: 'How can I get started?',
        answer: 'Simply sign up on our platform, configure your inventory details, and let our AI handle the rest!',
        category: 'Getting Started',
    },
    {
        question: 'What is AI Stock Management?',
        answer: 'AI Stock Management is a smart solution that helps small businesses and shop owners manage their stock efficiently. It provides AI-powered insights and recommendations on stock levels, product discontinuation, expiry tracking, and dynamic pricing.',
        category: 'General Questions',
    },
    {
        question:
            'How does AI determine the Minimum Stock Level and Reorder Point?',
        answer: 'AI calculates the minimum stock needed to maintain smooth operations and alerts when its time to reorder based on past sales data and demand forecasts.',
        category: 'Stock Recomendation',
    },
    {
        question: 'What is the Expiry Tracker?',
        answer: 'The Expiry Tracker monitors the expiration dates of products and alerts the owner when a product is about to expire, helping reduce losses due to expired stock.',
        category: 'Product Lifecycle management',
    },
];

export function FaqSectionWithCategoriesDemo() {
    return (
        <FaqSectionWithCategories
            title="Frequently Asked Questions"
            description="Find answers to common questions about our services"
            items={DEMO_FAQS}
            contactInfo={{
                title: 'Still have questions?',
                buttonText: 'Contact Support',
                onContact: () => console.log('Contact support clicked'),
            }}
        />
    );
}
export default FaqSectionWithCategoriesDemo;
