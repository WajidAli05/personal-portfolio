// A drafting dimension line that draws itself when it scrolls into view.
export function Dim({ label }: { label: string }) {
  return (
    <div className="dim" data-dim aria-hidden="true">
      <span>{label}</span>
      <span className="ln" />
    </div>
  );
}
