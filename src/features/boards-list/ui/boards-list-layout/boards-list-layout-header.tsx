export function BoardsListLayoutHeader({
  title,
  filters,
  actions,
}: {
  title: React.ReactNode;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      {title}
      {filters}
      <div className="flex items-center justify-between">{actions}</div>
    </div>
  );
}

export function BoardsListLayoutFilters({
  sort,
  filters,
}: {
  sort: React.ReactNode;
  filters: React.ReactNode;
}) {
  console.log("render filters");
  
  return (
    <div className="flex items-center gap-17 flex-wrap">
      {filters}
      <div className="flex items-center gap-2">
        Сортировать по:
        {sort}
      </div>
    </div>
  );
}