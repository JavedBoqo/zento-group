import { useId } from "react";

export function Field({
  label,
  value,
  onChange,
  multiline = false,
  required = false,
  disabled = false,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  hint?: string;
}) {
  const id = useId();
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="admin-field-label">
        {label}
        {required ? " *" : ""}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={5}
          required={required}
          disabled={disabled}
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          step={type === "number" ? "any" : undefined}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          disabled={disabled}
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
      )}
      {hint && (
        <p id={`${id}-hint`} className="admin-field-hint">
          {hint}
        </p>
      )}
    </div>
  );
}

export function LinesField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <Field
      label={label}
      multiline
      value={value.join("\n")}
      onChange={(text) => onChange(text.split("\n"))}
      hint="One item or paragraph per line."
    />
  );
}
