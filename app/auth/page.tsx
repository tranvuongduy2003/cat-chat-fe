import { LoginTab } from "@/components/auth/login-tab";
import { RegisterTab } from "@/components/auth/register-tab";
import { BackButton } from "@/components/ui/back-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4 gap-4">
      <BackButton />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Chat Application</CardTitle>
          <CardDescription>Login or Create an Account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <LoginTab />

            {/* Register Tab */}
            <RegisterTab />
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
