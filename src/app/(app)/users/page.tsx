import React from 'react'
import Stats from './Stats'
import UserManagementTable from './UserManagementTable'

const page = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-title">
          User Management
        </h1>
        <p className="text-sm text-description mt-1">
          View and manage app users and their activity
        </p>
      </div>

      <Stats/>

      <UserManagementTable/>
    </div>
  )
}

export default page
