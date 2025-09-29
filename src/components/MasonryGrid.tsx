interface GridProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string | number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export const MasonryGrid = <T,>({
  items,
  getKey,
  renderItem,
}: GridProps<T>) => {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
      {items.map((item, index) => (
        <div key={getKey(item, index)} className="break-inside-avoid mb-4">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};
