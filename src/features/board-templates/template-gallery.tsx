import { Card, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { ScrollArea, ScrollBar } from "@/shared/ui/kit/scroll-area";

const templates = [
  {
    id: 1,
    title: "Template 1",
    image: "/images/templates/template-1.png",
  },
  {
    id: 2,
    title: "Template 2",
    image: "/images/templates/template-2.png",
  },
  {
    id: 3,
    title: "Template 3",
    image: "/images/templates/template-3.png",
  },
  {
    id: 4,
    title: "Template 4",
    image: "/images/templates/template-4.png",
  },
  {
    id: 5,
    title: "Template 5",
    image: "/images/templates/template-5.png",
  },
  {
    id: 6,
    title: "Template 6",
    image: "/images/templates/template-6.png",
  },
  {
    id: 7,
    title: "Template 7",
    image: "/images/templates/template-7.png",
  },
  {
    id: 8,
    title: "Template 8",
    image: "/images/templates/template-8.png",
  },
  {
    id: 9,
    title: "Template 9",
    image: "/images/templates/template-9.png",
  },


];

export function TemplateGallery() {
  return (
    <div className="w-full flex">
      <ScrollArea type="hover" className="w-1 flex-1 rounded-2xl px-1 bg-gray-100">
        <div className="flex items-center gap-3 py-3 px-2 w-max whitespace-nowrap">
          {templates.map((template) => (
            <Card key={template.id} className="w-32 h-32 flex flex-col justify-end py-3 bg-gray-200 cursor-pointer hover:scale-105 transition-all duration-300">
              <CardHeader className="px-3 flex flex-col justify-end">
                <CardTitle className="text-sm">{template.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}