import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type WriteupCategory =
  | "web"
  | "pwn"
  | "crypto"
  | "rev"
  | "forensics"
  | "osint"
  | "misc";

export interface Writeup {
  slug: string;
  title: string;
  ctf: string;
  category: WriteupCategory;
  excerpt: string;
  author: string;
  publishedAt: string; // ISO date
  featured?: boolean;
  directoryPath: string; // path relative to public/writeups
}

function getAllMarkdownFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else if (filePath.endsWith(".md")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

export function getWriteups(): Writeup[] {
  const writeupsDir = path.join(process.cwd(), "public", "writeups");
  if (!fs.existsSync(writeupsDir)) {
    return [];
  }

  const markdownFiles = getAllMarkdownFiles(writeupsDir);
  const writeups: Writeup[] = [];

  for (const mdFile of markdownFiles) {
    const fileContents = fs.readFileSync(mdFile, "utf8");
    const { data } = matter(fileContents);
    
    // Directory path relative to public/writeups
    // Note: use path.posix logic or normalize to replace backslashes on windows
    const relDirPath = path.dirname(path.relative(writeupsDir, mdFile)).replace(/\\/g, '/');

    const tags = data.tags || [];
    let category: WriteupCategory = "misc";
    if (tags.includes("web")) category = "web";
    if (tags.includes("pwn")) category = "pwn";
    if (tags.includes("crypto") || tags.includes("cryptography")) category = "crypto";
    if (tags.includes("rev") || tags.includes("reverse engineering")) category = "rev";
    if (tags.includes("forensics")) category = "forensics";
    if (tags.includes("osint")) category = "osint";

    let ctf = "CTF";
    const ctfTag = tags.find((t: string) => t.toLowerCase().includes("ctf"));
    if (ctfTag) ctf = ctfTag;

    // Use frontmatter slug if available, otherwise filename (or parent dir if README)
    let slug = data.slug;
    if (!slug) {
      const parsed = path.parse(mdFile);
      slug = parsed.name === "README" ? path.basename(path.dirname(mdFile)) : parsed.name;
      // Sanitize slug
      slug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    writeups.push({
      slug,
      title: data.title || slug,
      ctf: ctf,
      category: category,
      excerpt: data.description || "",
      author: data.author || "CSeC",
      publishedAt: data.pubDatetime ? new Date(data.pubDatetime).toISOString() : new Date().toISOString(),
      featured: data.featured === true,
      directoryPath: relDirPath === "." ? "" : relDirPath,
    });
  }

  return writeups.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getWriteup(slug: string): { data: Writeup; content: string } | null {
  const writeupsDir = path.join(process.cwd(), "public", "writeups");
  if (!fs.existsSync(writeupsDir)) {
    return null;
  }

  const markdownFiles = getAllMarkdownFiles(writeupsDir);
  
  for (const mdFile of markdownFiles) {
    const fileContents = fs.readFileSync(mdFile, "utf8");
    const { data, content } = matter(fileContents);
    
    let currentSlug = data.slug;
    if (!currentSlug) {
      const parsed = path.parse(mdFile);
      currentSlug = parsed.name === "README" ? path.basename(path.dirname(mdFile)) : parsed.name;
      currentSlug = currentSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    if (currentSlug === slug) {
      const relDirPath = path.dirname(path.relative(writeupsDir, mdFile)).replace(/\\/g, '/');
      const tags = data.tags || [];
      let category: WriteupCategory = "misc";
      if (tags.includes("web")) category = "web";
      if (tags.includes("pwn")) category = "pwn";
      if (tags.includes("crypto") || tags.includes("cryptography")) category = "crypto";
      if (tags.includes("rev") || tags.includes("reverse engineering")) category = "rev";
      if (tags.includes("forensics")) category = "forensics";
      if (tags.includes("osint")) category = "osint";

      let ctf = "CTF";
      const ctfTag = tags.find((t: string) => t.toLowerCase().includes("ctf"));
      if (ctfTag) ctf = ctfTag;

      return {
        data: {
          slug: currentSlug,
          title: data.title || currentSlug,
          ctf: ctf,
          category: category,
          excerpt: data.description || "",
          author: data.author || "CSeC",
          publishedAt: data.pubDatetime ? new Date(data.pubDatetime).toISOString() : new Date().toISOString(),
          featured: data.featured === true,
          directoryPath: relDirPath === "." ? "" : relDirPath,
        },
        content
      };
    }
  }

  return null;
}
