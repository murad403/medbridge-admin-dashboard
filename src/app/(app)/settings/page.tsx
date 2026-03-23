"use client";
import PageHeader from "@/components/shared/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInformation from "./PersonalInformation";
import ChangePassword from "./ChangePassword";
import NotificationsSettings from "./NotificationsSettings";

const SettingsPage = () => {
  

  return (
    <div className="space-y-4 md:space-y-6">
      <PageHeader title="Settings" description="Configure system preferences and integrations" />

      <Tabs defaultValue="organization" className="w-full">
        <TabsList className="h-9 rounded-[10px] bg-[#ECEEF2] p-1">
          <TabsTrigger value="organization" className="px-5 text-sm data-active:font-medium">
            Organization
          </TabsTrigger>
          <TabsTrigger value="notifications" className="px-5 text-sm data-active:font-medium">
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organization" className="mt-4 space-y-4">
          

          <PersonalInformation/>
          <ChangePassword/>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <NotificationsSettings/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
