'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check } from 'lucide-react';

interface BoardEmbedCodeProps {
  boardId: string;
}

export function BoardEmbedCode({ boardId }: BoardEmbedCodeProps) {
  const [copied, setCopied] = useState(false);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const iframeCode = `<div id="octopus-widget"></div>
<script src="${appUrl}/embed/widget.js"></script>
<script>
  new OctopusWidget({
    boardId: '${boardId}',
    container: 'octopus-widget',
    mode: 'iframe'
  });
</script>`;

  const inlineCode = `<div id="octopus-widget"></div>
<link rel="stylesheet" href="${appUrl}/embed/widget.css">
<script src="${appUrl}/embed/widget.js"></script>
<script>
  new OctopusWidget({
    boardId: '${boardId}',
    container: 'octopus-widget',
    mode: 'inline'
  });
</script>`;

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Embed Your Board</CardTitle>
        <CardDescription>
          Add your feedback board to any website with a simple embed code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="iframe">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="iframe">Iframe (Recommended)</TabsTrigger>
            <TabsTrigger value="inline">Inline</TabsTrigger>
          </TabsList>

          <TabsContent value="iframe" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The iframe embed provides better isolation and security. Best for most use cases.
            </p>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                <code>{iframeCode}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(iframeCode)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="inline" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Inline embed renders directly in your page. Requires CORS configuration.
            </p>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                <code>{inlineCode}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(inlineCode)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
