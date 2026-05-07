interface Props {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  inputMode?: "text" | "email" | "tel" | "numeric";
}

export default function AuthFormField({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required,
  inputMode,
}: Props) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-gold-200">
        {label}
        {required && <span className="ms-1 text-gold-400">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        inputMode={inputMode}
        className="w-full rounded-xl border border-gold-400/20 bg-ink-900 px-4 py-3 text-sm text-gold-100 placeholder:text-gray-500 focus:border-gold-400 focus:outline-none"
      />
    </div>
  );
}
