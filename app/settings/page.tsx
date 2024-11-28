import { SettingsForm } from "@/components/settings/settings-form";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen bg-gray-100 p-4">
      <BackButton />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm />
        </CardContent>
      </Card>
    </div>
  );
}
