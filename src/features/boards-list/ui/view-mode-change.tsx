import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/kit/tabs";
import { ListIcon, GridIcon } from "lucide-react";

export type ViewMode = "grid" | "list";

export function ViewModeChange({
  value,
  onChange,
  className,
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
  className?: string;
}) {
  return (
    <Tabs
      defaultValue={value}
      onValueChange={(e) => onChange(e as ViewMode)}
      className={className}
    >
      <TabsList>
        <TabsTrigger value="grid">
          <GridIcon />
        </TabsTrigger>
        <TabsTrigger value="list">
          <ListIcon />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
