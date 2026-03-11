import React from 'react';
import GenericPage from './GenericPage';

export default function ContactPage() {
    return (
        <GenericPage title="Get in Touch">
            <p className="mb-4">
                Have questions about enterprise deployments, or want to report a bug?
            </p>
            <p className="font-mono text-indigo-600 bg-indigo-50 p-4 rounded-xl inline-block">
                hello@opsagent.dev
            </p>
        </GenericPage>
    );
}
