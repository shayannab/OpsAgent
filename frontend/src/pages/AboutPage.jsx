import React from 'react';
import GenericPage from './GenericPage';

export default function AboutPage() {
    return (
        <GenericPage title="About OpsAgent">
            <p className="mb-4">
                We built OpsAgent because we were tired of waking up at 3 AM to restart failed pods manually. 
                Our team consists of veteran DevOps engineers and machine learning practitioners who believe 
                that the future of infrastructure management is autonomous.
            </p>
            <p>
                OpsAgent uses cutting-edge LLMs to analyze your cluster state in real-time, providing immediate 
                context and autonomous healing capabilities to keep your services running smoothly.
            </p>
        </GenericPage>
    );
}
