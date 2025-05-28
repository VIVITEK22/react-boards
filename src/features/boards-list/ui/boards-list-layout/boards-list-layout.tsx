export function BoardsListLayout({
  header,
  templateGallery,
  content,
  sidebar,
}: {
  header: React.ReactNode;
  templateGallery?: React.ReactNode;
  content: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto w-full flex gap-10">
      {sidebar}
      <div className="flex flex-col gap-4 w-full space-y-4 p-4">
        {templateGallery}
        {header}
        {content}
      </div>
    </div>
  );
}
