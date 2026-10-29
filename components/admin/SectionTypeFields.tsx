"use client";

import {
  type CTAAction,
  type ContentSection,
  moveItem,
  newContentId,
} from "@/lib/article-content";
import { Field } from "./FormFields";
import RichTextEditor from "./RichTextEditor";
import { BuilderActions } from "./BuilderActions";
import StructuredSection from "@/components/blog/StructuredSection";

function ActionFields({
  label,
  action,
  onChange,
}: {
  label: string;
  action: CTAAction;
  onChange: (action: CTAAction) => void;
}) {
  return (
    <fieldset className="space-y-3 rounded-xl border border-[#e6ece5] p-4">
      <legend className="px-1 text-sm font-semibold">{label}</legend>
      <label className="admin-field-label">
        {label} action
        <select
          value={action.type}
          onChange={(event) => {
            const type = event.target.value as CTAAction["type"];
            onChange(
              type === "phone"
                ? { type, label: action.label, destination: "tel:01764790095" }
                : type === "link"
                  ? { type, label: action.label, destination: "/contact" }
                  : { type, label: action.label },
            );
          }}
        >
          <option value="consultation">Zento consultation form</option>
          <option value="contact">Zento contact form</option>
          <option value="phone">Phone call</option>
          <option value="link">Page or HTTPS link</option>
        </select>
      </label>
      <Field
        label={`${label} button label`}
        value={action.label}
        onChange={(value) => onChange({ ...action, label: value })}
      />
      {(action.type === "link" || action.type === "phone") && (
        <Field
          label={`${label} destination`}
          value={action.destination}
          onChange={(destination) => onChange({ ...action, destination })}
          hint={
            action.type === "phone"
              ? "Use tel: followed by the phone number."
              : "Use /contact or a full HTTPS URL."
          }
        />
      )}
    </fieldset>
  );
}

export default function SectionTypeFields({
  section,
  onChange,
}: {
  section: ContentSection;
  onChange: (section: ContentSection) => void;
}) {
  if (section.type === "cta")
    return (
      <div className="space-y-4">
        <label className="admin-field-label">
          CTA design
          <select value={section.variant} onChange={() => {}}>
            <option value="blue">Zento blue panel</option>
          </select>
        </label>
        <ActionFields
          label="Primary"
          action={section.primaryAction}
          onChange={(primaryAction) => onChange({ ...section, primaryAction })}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={!!section.secondaryAction}
            onChange={(event) =>
              onChange({
                ...section,
                secondaryAction: event.target.checked
                  ? {
                      type: "phone" as const,
                      label: "Call 0176 479 0095",
                      destination: "tel:01764790095",
                    }
                  : undefined,
              })
            }
          />
          Add secondary action
        </label>
        {section.secondaryAction && (
          <ActionFields
            label="Secondary"
            action={section.secondaryAction}
            onChange={(secondaryAction) =>
              onChange({ ...section, secondaryAction })
            }
          />
        )}
        <details className="rounded-xl border border-[#e6ece5] p-4">
          <summary className="cursor-pointer text-sm font-semibold">
            CTA component preview
          </summary>
          <div className="mt-4">
            <StructuredSection section={section} preview />
          </div>
          <p className="admin-field-hint">
            Buttons are inactive here. Use the article Preview for the full
            public layout.
          </p>
        </details>
      </div>
    );
  if (section.type !== "checklist") return null;
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold">Checklist items</h4>
      {section.items.map((item, index) => (
        <div
          key={item.id}
          className="space-y-2 rounded-xl border border-[#e6ece5] p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs">Item {index + 1}</span>
            <BuilderActions
              label={`checklist item ${index + 1}`}
              index={index}
              count={section.items.length}
              move={(to) =>
                onChange({
                  ...section,
                  items: moveItem(section.items, index, to),
                })
              }
              remove={() =>
                onChange({
                  ...section,
                  items: section.items.filter((value) => value.id !== item.id),
                })
              }
            />
          </div>
          <RichTextEditor
            label={`Checklist item ${index + 1}`}
            compact
            value={[{ type: "paragraph", content: item.content }]}
            onChange={(value) =>
              onChange({
                ...section,
                items: section.items.map((current) =>
                  current.id !== item.id
                    ? current
                    : {
                        ...current,
                        content: value.flatMap((node) =>
                          node.type === "paragraph" || node.type === "heading"
                            ? node.content
                            : node.items.flat(),
                        ),
                      },
                ),
              })
            }
          />
        </div>
      ))}
      <button
        type="button"
        className="admin-secondary"
        onClick={() =>
          onChange({
            ...section,
            items: [...section.items, { id: newContentId(), content: [] }],
          })
        }
      >
        Add checklist item
      </button>
    </div>
  );
}
