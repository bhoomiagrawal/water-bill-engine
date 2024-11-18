import DefaultLayout from '@/components/Layouts/DefaultLayout'
import ReadingGenerateForm from '@/components/ReadingSheet/ReadingGenerateForm';
import React from 'react'
const ReadingSheetPage = () => {
  return (
    <div>
        <DefaultLayout>
      <ReadingGenerateForm/>
      </DefaultLayout>
    </div>
  )
}

export default ReadingSheetPage;
