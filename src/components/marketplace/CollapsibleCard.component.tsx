import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CollapsibleCard({
  id,
  title,
  desc,
  children,
  anchor,
}: {
  id: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
  anchor?: boolean;
}) {
  const [open, setOpen] = React.useState(true);
  const anchorProps = anchor ? { id } : {};
  return (
    <div {...anchorProps}>
      <Card className="border-slate-200 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              {desc && <CardDescription>{desc}</CardDescription>}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen((v) => !v)}
              aria-label="toggle section"
            >
              {open ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        {open && <CardContent className="pt-2">{children}</CardContent>}
      </Card>
    </div>
  );
}
