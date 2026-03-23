import React from 'react'

const PageHeader = ({ title, description }: { title: string; description: string }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-title capitalize">
                {title}
            </h1>
            <p className="text-sm text-description mt-1">
                {description}
            </p>
        </div>
    )
}

export default PageHeader
