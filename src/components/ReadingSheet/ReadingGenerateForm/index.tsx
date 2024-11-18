"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Document {
  id: number;
  name: string;
}

const ReadingGenerateForm: React.FC<{ onSubmit?: (data: Document[]) => void }> = () => {
  const router = useRouter();
  const docList: Document[] = [
    { id: 1, name: '99D-15' },
    { id: 2, name: '99D-14' },
    { id: 3, name: '66D-15' },
    { id: 4, name: '96D-14' },
    { id: 5, name: '99D-14' },
  ];

  const handleView = (doc: Document) => {
    router.push('/readingSheetList');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Area Sub-Division Reading Sheets</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2 text-left font-medium">Area Code</th>
              <th className="border px-4 py-2 text-left font-medium">Reading Sheets</th>
            </tr>
          </thead>
          <tbody>
            {docList.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{doc.name}</td>
                <td className="border px-4 py-2">
                  <button
                    className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={() => handleView(doc)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadingGenerateForm;
