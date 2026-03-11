import React from 'react';
import GenericPage from './GenericPage';

export default function StatusPage() {
    return (
        <GenericPage title="System Status">
            <div className="flex justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-emerald-50 border-8 border-emerald-100 flex items-center justify-center">
                    <span className="text-3xl">✓</span>
                </div>
            </div>
            <p className="font-bold text-emerald-600 mb-2">All Systems Operational</p>
            <p className="text-sm">
                API, Inference Engine, and Dashboard services are currently experiencing 100% uptime.
            </p>
        </GenericPage>
    );
}
