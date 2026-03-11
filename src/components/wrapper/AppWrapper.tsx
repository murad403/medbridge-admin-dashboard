import React from 'react'
import AdminSidebar from './AdminSidebar'

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {/* sidebar */}
            <AdminSidebar />
            {children}
        </div>
    )
}

export default AppWrapper
