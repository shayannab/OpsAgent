import React from 'react';
import GenericPage from './GenericPage';

export default function PrivacyPage() {
    return (
        <GenericPage title="Privacy Policy">
            <p className="mb-4">
                We take your cluster data extremely seriously. OpsAgent only ever collects 
                the telemetry strictly necessary to diagnose pod failures. Your Groq API keys 
                never leave your local deployment.
            </p>
            <p>
                Our AI inference prompts contain sanitized pod names, namespaces, and restart counts 
                only—never environment variables or sensitive application data.
            </p>
        </GenericPage>
    );
}
