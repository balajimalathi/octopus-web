import { auth } from '@/lib/auth/auth';
import { getPlatformStats, getAllUsers, getAllBoards } from '@/lib/db/queries/admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { redirect } from 'next/navigation';
import { Users as UsersIcon, LayoutGrid, MessageSquare, Globe } from 'lucide-react';

export default async function AdminPage() {
  const session = await auth.api.getSession();

  if (!session || !['admin', 'super_admin'].includes(session.user.role as string)) {
    redirect('/dashboard');
  }

  const stats = await getPlatformStats();
  const users = await getAllUsers();
  const boards = await getAllBoards();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Boards</CardTitle>
            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBoards}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Public Boards</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publicBoards}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
          <CardDescription>Latest users who signed up</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.slice(0, 10).map((user) => (
              <div key={user.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{user.name || 'No name'}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {user.role}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Boards */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Boards</CardTitle>
          <CardDescription>Latest feedback boards created</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {boards.slice(0, 10).map((board) => (
              <div key={board.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{board.name}</p>
                  <p className="text-sm text-muted-foreground">{board.slug}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {board.isPublic ? 'Public' : 'Private'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
