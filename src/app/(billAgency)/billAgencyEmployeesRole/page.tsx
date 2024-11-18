import BillAgencyEmployeesRole from '@/components/BillAgency/BillAgencyEmployeesRole';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import React from 'react'

const EmployeesRoleMasterPage = () => {
  return (
    <div>
      <DefaultLayout>   
           <BillAgencyEmployeesRole/>
      </DefaultLayout>
    </div>
  )
}

export default EmployeesRoleMasterPage;
