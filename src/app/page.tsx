import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center space-y-8 py-10">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        P3MO User Management System
      </h1>
      <p className="max-w-[600px] text-center text-gray-500 md:text-xl">
        A modern user management system built with Next.js 14, TailwindCSS, and ShadCN UI
      </p>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to the User Management System</CardTitle>
          <CardDescription>
            This application allows you to manage users with a responsive UI.
            <br /><br />
            <strong>Note:</strong> This is a demo version with dummy data. No backend connection is required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>View and filter user accounts</li>
            <li>See user statistics with interactive charts</li>
            <li>View detailed user information</li>
            <li>Simulate PDF report generation</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Link href="/users" className="w-full">
            <Button className="w-full">Go to User Management</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
