'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Copy, ExternalLink } from 'lucide-react';
import { BoardEmbedCode } from '@/components/board/board-embed-code';

interface Board {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isPublic: boolean;
  themeConfig: any;
}

export default function BoardSettingsPage({ params }: { params: { boardId: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [board, setBoard] = useState<Board | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchBoard();
  }, [params.boardId]);

  const fetchBoard = async () => {
    try {
      const response = await fetch(`/api/boards/${params.boardId}`);
      if (!response.ok) throw new Error('Failed to fetch board');
      const data = await response.json();
      setBoard(data.board);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBoard = async (updates: Partial<Board>) => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/boards/${params.boardId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error('Failed to update board');

      toast({
        title: 'Saved!',
        description: 'Board settings updated successfully.',
      });

      fetchBoard();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateTheme = async (themeConfig: any) => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/boards/${params.boardId}/theme`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(themeConfig),
      });

      if (!response.ok) throw new Error('Failed to update theme');

      toast({
        title: 'Theme updated!',
        description: 'Board theme has been saved.',
      });

      fetchBoard();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const copyBoardLink = () => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/b/${board?.slug}`;
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copied!',
      description: 'Board link copied to clipboard.',
    });
  };

  if (isLoading) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  if (!board) {
    return <div className="container mx-auto py-8 px-4">Board not found</div>;
  }

  const boardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/b/${board.slug}`;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{board.name}</h1>
          <p className="text-muted-foreground mt-1">Board Settings</p>
        </div>
        <a href={boardUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Board
          </Button>
        </a>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="embed">Embed</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Board Information</CardTitle>
              <CardDescription>Update your board's basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Board Name</Label>
                <Input
                  id="name"
                  value={board.name}
                  onChange={(e) => setBoard({ ...board, name: e.target.value })}
                  onBlur={() => handleUpdateBoard({ name: board.name })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={board.description || ''}
                  onChange={(e) => setBoard({ ...board, description: e.target.value })}
                  onBlur={() => handleUpdateBoard({ description: board.description })}
                  rows={4}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Public Board</Label>
                  <p className="text-sm text-muted-foreground">
                    Anyone with the link can view and submit feedback
                  </p>
                </div>
                <Switch
                  checked={board.isPublic}
                  onCheckedChange={(checked) => {
                    setBoard({ ...board, isPublic: checked });
                    handleUpdateBoard({ isPublic: checked });
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Share Your Board</CardTitle>
              <CardDescription>Copy the link to share your feedback board</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input value={boardUrl} readOnly />
                <Button onClick={copyBoardLink} variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Customization</CardTitle>
              <CardDescription>Customize the look and feel of your board</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="themePreset">Theme Preset</Label>
                <Select
                  value={board.themeConfig?.themePreset || 'default'}
                  onValueChange={(value) => handleUpdateTheme({ ...board.themeConfig, themePreset: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={board.themeConfig?.primaryColor || '#000000'}
                    onChange={(e) => setBoard({
                      ...board,
                      themeConfig: { ...board.themeConfig, primaryColor: e.target.value }
                    })}
                    onBlur={() => handleUpdateTheme(board.themeConfig)}
                    className="w-20 h-10"
                  />
                  <Input
                    value={board.themeConfig?.primaryColor || '#000000'}
                    onChange={(e) => setBoard({
                      ...board,
                      themeConfig: { ...board.themeConfig, primaryColor: e.target.value }
                    })}
                    onBlur={() => handleUpdateTheme(board.themeConfig)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontFamily">Font Family</Label>
                <Select
                  value={board.themeConfig?.fontFamily || 'sans'}
                  onValueChange={(value) => handleUpdateTheme({ ...board.themeConfig, fontFamily: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sans">Sans-serif</SelectItem>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="mono">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customCSS">Custom CSS</Label>
                <Textarea
                  id="customCSS"
                  placeholder="/* Add custom CSS here */"
                  value={board.themeConfig?.customCSS || ''}
                  onChange={(e) => setBoard({
                    ...board,
                    themeConfig: { ...board.themeConfig, customCSS: e.target.value }
                  })}
                  onBlur={() => handleUpdateTheme(board.themeConfig)}
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="embed">
          <BoardEmbedCode boardId={board.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
