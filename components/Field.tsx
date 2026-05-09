export function Field({
  label,
  name,
  type,
  required,
  placeholder,
}: {
  label: string
  name: string
  type: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-[10px] tracking-[0.18em] uppercase text-cream/72">
        {label}
        {required && <span className="ml-1 text-gold/70" aria-hidden="true">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        aria-required={required ? true : undefined}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-sm bg-white/[0.04] border border-white/16 text-cream placeholder:text-cream/42 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-1 focus-visible:ring-offset-ink focus:border-gold/50 transition-colors rounded-lg"
      />
    </div>
  )
}
