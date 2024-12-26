import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Configure from '@/components/TariffConfiguration/Configure/Configure';
import React from 'react'

const ConfigurePage = () => {
  return (
    <div>
        <DefaultLayout>
        <Configure/>
        </DefaultLayout>
     
    </div>
  )
}

export default ConfigurePage;