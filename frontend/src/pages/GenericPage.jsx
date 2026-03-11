import React from 'react';

export default function GenericPage({ title, children }) {
    return (
        <div className="min-h-screen pt-32 pb-20 px-8 flex flex-col items-center justify-center text-center bg-[#fcfdff]">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                {title}
            </h1>
            <div className="max-w-2xl text-lg text-slate-600 leading-relaxed">
                {children}
            </div>
        </div>
    );
}
