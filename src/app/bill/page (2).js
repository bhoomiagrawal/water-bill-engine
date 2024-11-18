"use client";

import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Billing from '../../components/Bill/Billing';

export default function Bill() {
    return (
        <DefaultLayout>
            <main className="min-h-screen">
                <Billing />
            </main>
        </DefaultLayout>
    );
}
