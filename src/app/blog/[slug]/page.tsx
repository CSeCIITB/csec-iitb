import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { getWriteup, getWriteups } from "@/lib/content/writeups";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function generateStaticParams() {
  const allWriteups = getWriteups();
  return allWriteups.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const postData = getWriteup(slug);
  if (!postData) return {};
  return { title: postData.data.title, description: postData.data.excerpt };
}

export default async function WriteupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = getWriteup(slug);
  if (!postData) notFound();

  const { data: post, content } = postData;

  return (
    <Container className="py-20">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-[13px] text-fog-500 hover:text-fog-100"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All write-ups
      </Link>

      <div className="mt-8 flex items-center gap-3">
        <Badge variant="signal">{post.category}</Badge>
        <span className="font-mono text-[12px] text-fog-700">{post.ctf}</span>
      </div>

      <h1 className="mt-5 max-w-2xl text-balance font-display text-display-lg font-medium text-fog-50">
        {post.title}
      </h1>

      <div className="mt-5 flex items-center gap-3 font-mono text-[12px] text-fog-700">
        <span>{post.author}</span>
        <span>·</span>
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </div>

      <div className="mt-12 prose prose-invert max-w-none prose-headings:font-display prose-a:text-signal-400 hover:prose-a:text-signal-300">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({ node, src, alt, ...props }) => {
              let finalSrc = src;
              if (src && (src.startsWith("./") || !src.startsWith("http") && !src.startsWith("/") && !src.startsWith("#"))) {
                const cleanSrc = src.startsWith("./") ? src.slice(2) : src;
                finalSrc = `/writeups/${post.directoryPath ? post.directoryPath + '/' : ''}${cleanSrc}`;
              }
              return (
                <img
                  src={finalSrc}
                  alt={alt || ""}
                  className="rounded-xl border border-ink-700 shadow-card"
                  {...props}
                />
              );
            },
            a: ({ node, href, children, ...props }) => {
              let finalHref = href;
              if (href && (href.startsWith("./") || !href.startsWith("http") && !href.startsWith("/") && !href.startsWith("#"))) {
                const cleanHref = href.startsWith("./") ? href.slice(2) : href;
                finalHref = `/writeups/${post.directoryPath ? post.directoryPath + '/' : ''}${cleanHref}`;
              }
              return (
                <a href={finalHref} target={finalHref?.startsWith("/") || finalHref?.startsWith("#") ? "_self" : "_blank"} rel="noopener noreferrer" {...props}>
                  {children}
                </a>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </Container>
  );
}
