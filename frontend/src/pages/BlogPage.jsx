import React from 'react';
import GenericPage from './GenericPage';

export default function BlogPage() {
    return (
        <GenericPage title="OpsAgent Blog">
            <p className="mb-4">
                We're busy building the future of autonomous Kubernetes healing. 
                Our first engineering deep-dive on how we utilize the Llama 3 70B model 
                for sub-second root cause analysis will be dropping soon!
            </p>
            <p>
                Check back later for updates.
            </p>
        </GenericPage>
    );
}
