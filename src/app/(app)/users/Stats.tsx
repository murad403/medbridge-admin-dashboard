

const stats = [
    {
        label: "Total Users",
        value: "24,586",
        color: "text-green-500",
    },
    {
        label: "Active Users",
        value: "156,234",
        color: "text-emerald-500",
    },
    {
        label: "Guest Users",
        value: "128",
        color: "text-blue-500",
    },
    {
        label: "Avg. Saved Areas",
        value: "3,456",
        color: "text-cyan-500",
    },
];


const Stats = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5"
                >
                    <p className="text-sm text-description">{stat.label}</p>
                    <p className={`text-2xl font-medium ${stat.color}`}>{stat.value}</p>
                </div>
            ))}
        </div>
    )
}

export default Stats
