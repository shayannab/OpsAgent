import React from 'react';
import GenericPage from './GenericPage';

export default function TermsPage() {
    return (
        <GenericPage title="Terms of Service">
            <p className="mb-4">
                By using OpsAgent, you acknowledge that autonomous healing involves stopping and 
                starting infrastructure components. You are responsible for ensuring that your 
                applications are designed gracefully to handle rapid pod rotation.
            </p>
            <p>
                We provide the software "as-is" to assist DevOps teams, not replace root cause resolution.
            </p>
        </GenericPage>
    );
}
