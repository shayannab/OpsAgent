import React from 'react';
import GenericPage from './GenericPage';

export default function PricingPage() {
    return (
        <GenericPage title="Simple, Transparent Pricing">
            <p className="mb-4">
                OpsAgent is currently in Open Beta. All core monitoring and AI healing features 
                are completely free to use while we gather feedback and harden our models.
            </p>
            <p>
                When we launch our premium tier, it will be priced per-node, with infinite pods included.
            </p>
        </GenericPage>
    );
}
