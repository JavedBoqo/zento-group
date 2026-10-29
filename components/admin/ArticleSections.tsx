"use client";

import { useState } from "react";
import { GripVertical, Plus } from "lucide-react";
import {
  duplicateSection,
  convertSection,
  moveItem,
  newContentId,
  richTextPlainText,
  type ContentBlock,
  type ContentSection,
  type RichText,
  type SectionType,
} from "@/lib/article-content";
import { Field } from "./FormFields";
import ImageUpload from "./ImageUpload";
import RichTextEditor from "./RichTextEditor";
import SectionTypeFields from "./SectionTypeFields";
import { BuilderActions } from "./BuilderActions";

function BlockEditor({
  block,
  update,
}: {
  block: ContentBlock;
  update: (block: ContentBlock) => void;
}) {
  switch (block.type) {
    case "richText":
      return (
        <RichTextEditor
          label="Paragraphs"
          value={block.content}
          onChange={(content) => update({ ...block, content })}
        />
      );
    case "subheading":
      return (
        <Field
          label="Subheading"
          value={block.text}
          onChange={(text) => update({ ...block, text })}
        />
      );
    case "image":
      return (
        <div className="space-y-3">
          <ImageUpload
            label="Section image"
            value={block.src}
            alt={block.alt}
            onChange={(src) => update({ ...block, src })}
          />
          <Field
            label="Image alt text"
            value={block.alt}
            onChange={(alt) => update({ ...block, alt })}
          />
        </div>
      );
    case "callout":
      return (
        <div className="space-y-3">
          <label className="admin-field-label">
            Callout style
            <select
              value={block.style}
              onChange={(event) =>
                update({
                  ...block,
                  style: event.target.value as "info" | "quote",
                })
              }
            >
              <option value="info">Information</option>
              <option value="quote">Quote</option>
            </select>
          </label>
          <RichTextEditor
            label="Callout text"
            value={block.content}
            onChange={(content) => update({ ...block, content })}
            compact
          />
        </div>
      );
    case "list":
      return (
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={block.ordered}
              onChange={(event) =>
                update({ ...block, ordered: event.target.checked })
              }
            />{" "}
            Numbered list
          </label>
          <RichTextEditor
            label="List items"
            value={block.items.map((content) => ({
              type: "paragraph",
              content,
            }))}
            onChange={(value: RichText) =>
              update({
                ...block,
                items: value.flatMap((node) =>
                  node.type === "paragraph" || node.type === "heading"
                    ? [node.content]
                    : node.items,
                ),
              })
            }
            compact
          />
          <p className="admin-field-hint">
            Press Enter for another item. Text formatting and links are
            supported.
          </p>
        </div>
      );
  }
}

function makeBlock(type: string): ContentBlock {
  const id = newContentId();
  if (type === "subheading") return { id, type, text: "" };
  if (type === "image") return { id, type, src: "", alt: "" };
  if (type === "list") return { id, type, ordered: false, items: [] };
  if (type === "quote" || type === "info")
    return { id, type: "callout", style: type, content: [] };
  return { id, type: "richText", content: [] };
}

export default function ArticleSections({
  sections,
  onChange,
}: {
  sections: ContentSection[];
  onChange: (
    sections:
      ContentSection[] | ((current: ContentSection[]) => ContentSection[]),
  ) => void;
}) {
  const [openId, setOpenId] = useState<string | null>(sections[0]?.id || null);
  const [choosingType, setChoosingType] = useState(false);
  const update = (index: number, section: ContentSection) =>
    onChange(sections.map((value, i) => (i === index ? section : value)));
  function addSection(type: SectionType) {
    const section = convertSection(
      {
        id: newContentId(),
        title: "",
        layout: "standard",
        blocks: [makeBlock("richText")],
      },
      type,
    );
    onChange([...sections, section]);
    setOpenId(section.id);
    setChoosingType(false);
  }
  return (
    <section className="space-y-3" aria-label="Article sections">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#60705b]">
          One section at a time. Everything you type stays in this draft.
        </p>
        <button
          type="button"
          className="admin-secondary"
          aria-expanded={choosingType}
          onClick={() => setChoosingType(!choosingType)}
        >
          <Plus size={15} /> Add section
        </button>
      </div>
      {choosingType && (
        <fieldset className="flex flex-wrap gap-2 rounded-xl border border-[#e6ece5] bg-white p-4">
          <legend className="px-1 text-sm font-semibold">
            Choose section type
          </legend>
          {(
            [
              ["content", "Standard content section"],
              ["cta", "CTA section"],
              ["checklist", "Checklist / highlight section"],
            ] as const
          ).map(([type, label]) => (
            <button
              key={type}
              type="button"
              className="admin-secondary"
              onClick={() => addSection(type)}
            >
              {label}
            </button>
          ))}
        </fieldset>
      )}
      {!sections.length && (
        <p className="py-6 text-center text-sm text-[#60705b]">
          Add your first section to start writing.
        </p>
      )}
      {sections.map((section, index) => {
        const primary = section.blocks.find(
          (block) => block.type === "richText",
        );
        const extra = section.blocks.filter(
          (block) => block.id !== primary?.id,
        );
        const summary = (
          section.blocks
            .map((block) =>
              block.type === "richText" || block.type === "callout"
                ? richTextPlainText(block.content)
                : block.type === "subheading"
                  ? block.text
                  : block.type === "image"
                    ? block.alt
                    : block.items
                        .flat()
                        .map((part) => part.text)
                        .join(" "),
            )
            .join(" ") +
          (section.type === "checklist"
            ? " " +
              section.items
                .flatMap((item) => item.content.map((part) => part.text))
                .join(" ")
            : "")
        ).slice(0, 110);
        return (
          <article
            key={section.id}
            className="overflow-hidden rounded-xl border border-[#e6ece5] bg-white"
            onDragOver={(event) => {
              if (
                event.dataTransfer.types.includes("application/x-zento-section")
              )
                event.preventDefault();
            }}
            onDrop={(event) => {
              const from = sections.findIndex(
                (item) =>
                  item.id ===
                  event.dataTransfer.getData("application/x-zento-section"),
              );
              if (from >= 0) {
                event.preventDefault();
                event.stopPropagation();
                onChange(moveItem(sections, from, index));
              }
            }}
          >
            <div className="flex flex-wrap items-center gap-1 px-3 pt-2">
              <button
                type="button"
                draggable
                aria-label={"Drag section " + (index + 1)}
                className="admin-builder-icon cursor-grab"
                onDragStart={(event) => {
                  event.dataTransfer.setData(
                    "application/x-zento-section",
                    section.id,
                  );
                  event.dataTransfer.effectAllowed = "move";
                }}
              >
                <GripVertical size={16} />
              </button>
              <span className="mr-auto text-xs text-[#60705b]">
                Section {index + 1} ·{" "}
                {section.type === "cta" || section.layout === "service"
                  ? "CTA"
                  : section.type === "checklist"
                    ? "Checklist"
                    : "Content"}
              </span>
              <BuilderActions
                label={"section " + (index + 1)}
                index={index}
                count={sections.length}
                move={(to) => onChange(moveItem(sections, index, to))}
                duplicate={() => {
                  const copy = duplicateSection(section);
                  onChange([
                    ...sections.slice(0, index + 1),
                    copy,
                    ...sections.slice(index + 1),
                  ]);
                  setOpenId(copy.id);
                }}
                remove={() => {
                  if (
                    window.confirm(
                      "Remove this section? Changes apply when you save.",
                    )
                  ) {
                    onChange(sections.filter((item) => item.id !== section.id));
                    if (openId === section.id) setOpenId(null);
                  }
                }}
              />
            </div>
            <details open={openId === section.id}>
              <summary
                onClick={(event) => {
                  event.preventDefault();
                  setOpenId((current) =>
                    current === section.id ? null : section.id,
                  );
                }}
                className="cursor-pointer px-5 pb-4 pt-2"
              >
                <span className="font-semibold">
                  {section.title || "Untitled section"}
                </span>
                {openId !== section.id && (
                  <span className="mt-1 block truncate text-xs font-normal text-[#60705b]">
                    {summary || "No content yet"}
                  </span>
                )}
              </summary>
              <div className="space-y-5 border-t border-[#eef2eb] p-5">
                <label className="admin-field-label">
                  Section type
                  <select
                    value={section.type || "content"}
                    onChange={(event) => {
                      const type = event.target.value as SectionType;
                      if (
                        section.type === "cta" &&
                        !window.confirm(
                          "Change section type? Text and images are preserved; CTA button settings will be removed.",
                        )
                      )
                        return;
                      update(index, convertSection(section, type));
                    }}
                  >
                    <option value="content">Standard content</option>
                    <option value="cta">CTA section</option>
                    <option value="checklist">Checklist / highlight</option>
                  </select>
                </label>
                <Field
                  label="Section title"
                  value={section.title}
                  onChange={(title) => update(index, { ...section, title })}
                />
                <RichTextEditor
                  label={
                    section.type === "cta"
                      ? "CTA description"
                      : section.type === "checklist"
                        ? "Checklist introduction (optional)"
                        : "Section content"
                  }
                  headings
                  value={primary?.type === "richText" ? primary.content : []}
                  onChange={(content) =>
                    update(index, {
                      ...section,
                      blocks: primary
                        ? section.blocks.map((block) =>
                            block.id === primary.id
                              ? { ...primary, content }
                              : block,
                          )
                        : [
                            ...section.blocks,
                            { id: newContentId(), type: "richText", content },
                          ],
                    })
                  }
                />
                <SectionTypeFields
                  section={section}
                  onChange={(value) => update(index, value)}
                />
                <details className="border-t border-[#eef2eb] pt-3">
                  <summary className="cursor-pointer text-xs font-medium text-secondary">
                    Add content element
                    {extra.length ? " · " + extra.length + " additional" : ""}
                  </summary>
                  <div className="mt-4 space-y-4">
                    {extra.map((block) => {
                      const blockIndex = section.blocks.findIndex(
                        (item) => item.id === block.id,
                      );
                      return (
                        <div
                          key={block.id}
                          className="space-y-3 border-b border-[#eef2eb] pb-4"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs capitalize text-[#60705b]">
                              {block.type === "richText"
                                ? "Additional text"
                                : block.type}
                            </span>
                            <BuilderActions
                              label={
                                "element " +
                                (blockIndex + 1) +
                                " in section " +
                                (index + 1)
                              }
                              index={blockIndex}
                              count={section.blocks.length}
                              move={(to) =>
                                update(index, {
                                  ...section,
                                  blocks: moveItem(
                                    section.blocks,
                                    blockIndex,
                                    to,
                                  ),
                                })
                              }
                              duplicate={() =>
                                update(index, {
                                  ...section,
                                  blocks: [
                                    ...section.blocks.slice(0, blockIndex + 1),
                                    {
                                      ...structuredClone(block),
                                      id: newContentId(),
                                    },
                                    ...section.blocks.slice(blockIndex + 1),
                                  ],
                                })
                              }
                              remove={() =>
                                update(index, {
                                  ...section,
                                  blocks: section.blocks.filter(
                                    (item) => item.id !== block.id,
                                  ),
                                })
                              }
                            />
                          </div>
                          <BlockEditor
                            block={block}
                            update={(value) => {
                              // An upload may finish after other text has changed. Apply only its changed fields.
                              const previous = new Map(Object.entries(block));
                              const changes = Object.fromEntries(
                                Object.entries(value).filter(
                                  ([key, next]) =>
                                    JSON.stringify(previous.get(key)) !==
                                    JSON.stringify(next),
                                ),
                              );
                              onChange((currentSections) =>
                                currentSections.map((current) =>
                                  current.id !== section.id
                                    ? current
                                    : {
                                        ...current,
                                        blocks: current.blocks.map((item) =>
                                          item.id === block.id
                                            ? ({
                                                ...item,
                                                ...changes,
                                              } as ContentBlock)
                                            : item,
                                        ),
                                      },
                                ),
                              );
                            }}
                          />
                        </div>
                      );
                    })}
                    <label className="admin-field-label">
                      Content element
                      <select
                        value=""
                        onChange={(event) => {
                          if (event.target.value)
                            update(index, {
                              ...section,
                              blocks: [
                                ...section.blocks,
                                makeBlock(event.target.value),
                              ],
                            });
                        }}
                      >
                        <option value="">Choose an optional element…</option>
                        <option value="image">Image</option>
                        <option value="quote">Quote</option>
                        <option value="info">Information callout</option>
                        <option value="list">Separate list</option>
                        <option value="richText">Additional rich text</option>
                        <option value="subheading">Separate subheading</option>
                      </select>
                    </label>
                  </div>
                </details>
              </div>
            </details>
          </article>
        );
      })}
    </section>
  );
}
