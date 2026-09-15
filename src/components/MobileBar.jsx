export default function MobileBar({ onOrder }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-surface/95 backdrop-blur-lg shadow-[0_-4px_20px_rgba(36,26,23,0.08)] px-gutter-mobile py-space-sm flex items-center justify-around gap-space-xs">
      <a
        className="flex-1 flex flex-col items-center justify-center py-space-xs rounded-lg text-on-surface-variant hover:text-secondary active:bg-surface-container transition-colors"
        href="tel:+918439356155"
      >
        <span className="material-symbols-outlined text-[20px] text-secondary">call</span>
        <span className="font-caption text-caption mt-0.5">Call</span>
      </a>
      <a
        className="flex-1 flex flex-col items-center justify-center py-space-xs rounded-lg text-on-surface-variant hover:text-secondary active:bg-surface-container transition-colors"
        href="#location-map"
      >
        <span className="material-symbols-outlined text-[20px] text-secondary">near_me</span>
        <span className="font-caption text-caption mt-0.5">Directions</span>
      </a>
      <button
        type="button"
        onClick={onOrder}
        className="flex-1 flex flex-col items-center justify-center py-space-xs rounded-lg bg-secondary text-on-secondary shadow-sm"
      >
        <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
        <span className="font-caption text-caption mt-0.5 font-semibold">Order</span>
      </button>
    </div>
  );
}
