import PageHeader from "@/components/shared/PageHeader"
import ChangePassword from "./ChangePassword"
import NotificationsSettings from "./NotificationsSettings"
import PersonalInformation from "./PersonalInformation"


const page = () => {
  return (
    <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
      <PageHeader title="Settings" description="Manage your account and application preferences"/>

      <PersonalInformation />
      <ChangePassword />
      <NotificationsSettings />

    </div>
  )
}

export default page
