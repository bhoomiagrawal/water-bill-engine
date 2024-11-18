import React, { useState } from 'react';

interface Document {
  id: number;
  name: string;
  uploaded: boolean;
  status: string;
  file?: File | null;
}

const UploadDocuments: React.FC<{ onSubmit?: (data: Document[]) => void }> = ({ onSubmit }) => {
  const [docList, setDocList] = useState<Document[]>([
    { id: 1, name: 'Memorandum of Article', uploaded: false, status: 'No Document Selected' },
    { id: 2, name: 'LOI Copy', uploaded: false, status: 'No Document Selected' },
    { id: 3, name: 'Work Order Copy', uploaded: false, status: 'No Document Selected' },
    { id: 4, name: 'PAN / TAN Copy', uploaded: false, status: 'No Document Selected' },
    { id: 5, name: 'CIN Registration Copy', uploaded: false, status: 'No Document Selected' },
    { id: 6, name: 'Other', uploaded: false, status: 'No Document Selected' },
  ]);

  const [isCheckboxChecked, setCheckboxChecked] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleFileChange = (index: number, file: File | null) => {
    const updatedDocList = [...docList];
    updatedDocList[index].file = file;
    updatedDocList[index].status = file ? 'Document Selected' : 'No Document Selected';
    setDocList(updatedDocList);
  };

  const uploadDocs = (id: number, index: number) => {
    const updatedDocList = [...docList];
    if (updatedDocList[index].file) {
      updatedDocList[index].uploaded = true;
      updatedDocList[index].status = 'Uploaded';
      setDocList(updatedDocList);
      console.log(`Uploaded: ${updatedDocList[index].name}`, updatedDocList[index].file);
    }
  };

  const removeDocs = (id: number, index: number) => {
    const updatedDocList = [...docList];
    updatedDocList[index].uploaded = false;
    updatedDocList[index].file = null;
    updatedDocList[index].status = 'No Document Selected';
    setDocList(updatedDocList);
  };

  const filePreview = (file: File | null) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    }
  };

  const handleSubmit = () => {
    if (!isCheckboxChecked) {
      setPopupMessage("Please confirm that you have read and/or understood the Application Form and its Terms & Conditions.");
      setPopupVisible(true);
      return;
    }

    const workOrderDoc = docList.find(doc => doc.name === 'Work Order Copy');

    if (!workOrderDoc?.uploaded) {
      setPopupMessage("Please upload the Work Order Copy.");
      setPopupVisible(true);
      return;
    }

    const uploadedDocuments = docList.filter(doc => doc.uploaded);
    if (onSubmit) {
      onSubmit(uploadedDocuments);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-bold">
          <strong>Upload</strong> Supporting Documents below{' '}
          <span className="text-red-600">(PDF/IMAGE, Max-Size 30 MB)</span>
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border px-2 py-2 text-left">DOCUMENT NAME</th>
              <th className="border px-2 py-2 text-left">DOCUMENT STATUS</th>
              <th className="border px-2 py-2 text-left">VIEW</th>
              <th className="border px-2 py-2 text-left">ATTACH</th>
              <th className="border px-2 py-2 text-left">UPLOAD</th>
              <th className="border px-2 py-2 text-left">REMOVE</th>
            </tr>
          </thead>
          <tbody>
            {docList.map((doc, index) => (
              <tr key={doc.id}>
                <td className="border px-2 py-2">
                  {doc.name}
                  {doc.name === 'Work Order Copy' && <span className="text-red-600">*</span>}
                </td>
                <td className="border px-2 py-2">{doc.status}</td>
                <td className="border px-2 py-2">
                  {doc.uploaded && (
                    <button
                      className="bg-blue-500 text-white px-2 py-1"
                      onClick={() => filePreview(doc.file || null)}
                    >
                      View
                    </button>
                  )}
                </td>
                <td className="border px-2 py-2">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                  />
                </td>
                <td className="border px-2 py-2">
                  {doc.status === 'Document Selected' && (
                    <button
                      className="bg-green-500 text-white px-2 py-1"
                      onClick={() => uploadDocs(doc.id, index)}
                    >
                      Upload
                    </button>
                  )}
                </td>
                <td className="border px-2 py-2">
                  {doc.uploaded && (
                    <button
                      className="bg-red-500 text-white px-2 py-1"
                      onClick={() => removeDocs(doc.id, index)}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-yellow-100 p-4 mt-4 rounded-md">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={isCheckboxChecked}
            onChange={(e) => setCheckboxChecked(e.target.checked)}
          />
          I have read and/or understood the Application Form and its Terms & Conditions...
        </label>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Validation Error</h2>
            <p>{popupMessage}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
              onClick={() => setPopupVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;
