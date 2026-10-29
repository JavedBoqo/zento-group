import Image from "next/image";
import { UserRound, ShieldCheck } from "lucide-react";
import { estimateReadingTime, type Article } from "@/lib/blog";
import { confirmedReview } from "@/lib/authors";

export default function AuthorAttribution({
  article,
  readingTime = estimateReadingTime(article),
}: {
  article: Article;
  readingTime?: number;
}) {
  const { author, reviewer } = article;
  const name = author?.fullName.trim();
  const names = name?.split(/\s+/) || [];
  const initials =
    names.length > 1
      ? (names[0][0] + names[names.length - 1][0]).toUpperCase()
      : (names[0] || "").slice(0, 2).toUpperCase();
  const role = author?.role.trim();
  const date = article.updatedAt ? new Date(article.updatedAt) : null;
  const validDate = date && !Number.isNaN(date.getTime()) ? date : null;
  return (
    <div className="flex min-w-0 items-start gap-3 text-xs text-zinc-500">
      {name &&
        (author?.photo.src ? (
          <Image
            src={author.photo.src}
            alt={author.photo.alt || name}
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-label={name + " avatar"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-xs font-bold text-secondary"
          >
            {initials || <UserRound className="h-4 w-4" aria-hidden="true" />}
          </span>
        ))}
      <div className="min-w-0 space-y-1 leading-relaxed">
        {name && (
          <p className="flex flex-wrap items-baseline gap-x-1.5">
            <span className="sr-only">Written by </span>
            <span className="font-semibold text-secondary">{name}</span>
            {role && role.toLocaleLowerCase() !== name.toLocaleLowerCase() && (
              <>
                <span aria-hidden="true">·</span>
                <span>{role}</span>
              </>
            )}
          </p>
        )}
        <p className="flex flex-wrap items-baseline gap-x-1.5">
          {validDate && (
            <>
              <span>
                Updated{" "}
                <time dateTime={validDate.toISOString()}>
                  {validDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
              </span>
              <span aria-hidden="true">·</span>
            </>
          )}
          <span>{readingTime} min read</span>
        </p>
        {reviewer && confirmedReview(article) && (
          <p className="flex items-start gap-1.5">
            <ShieldCheck
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span>
              Clinically reviewed by{" "}
              <span className="font-medium text-secondary">
                {reviewer.fullName}
              </span>
              {reviewer.role && " · " + reviewer.role}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
