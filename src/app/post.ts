import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Octokit } from "@octokit/rest";
import { log } from "console";

const postsDirectory = path.join(process.cwd(), "/public/blog");
const octokit = new Octokit();

export type Post = {
  title: string;
  thumbnail?: string;
  summary?: string;
  date: string;
  content: string;
  contentHtml: string;
  slug: string;
  link: string;
  tags: string[];
  original?: any;
};

const toHtml = async (content: string) => (await remark().use(html).process(content)).toString();

export async function getPostSlugsFromLocal(): Promise<string[]> {
  const names = await fs.readdir(postsDirectory);
  const result = names.filter((name) => name.endsWith(".md"));
  return result;
}

export async function generatePostFromLocal(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const summary = data.summary ?? content.split("<!-- more -->")?.at(0)?.trim() ?? "";

  return {
    ...data,
    date: new Date(data.date).toISOString(),
    tags: data.tags ?? [],
    content,
    contentHtml: await toHtml(content),
    summary: await toHtml(summary),
    slug: realSlug,
    link: `/blog/${realSlug}`,
  } as Post;
}

const posts: Post[] = [];

export const generatePosts = async () => {
  if (posts.length === 0) {
    const slugs = await getPostSlugsFromLocal();
    for (const slug of slugs) {
      const post = await generatePostFromLocal(slug);
      posts.push(post);
    }
    const res = await fetch("https://api.github.com/repos/ddalpange/yh-blog-next/issues", {
      cache: "force-cache",
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `Bearer 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`,
      },
    });
    const data = await res.json();
    for (const issue of data) {
      log(issue);
      posts.push({
        title: issue.title,
        date: new Date(issue.created_at).toISOString(),
        content: issue.body ?? "",
        contentHtml: issue.body ?? "",
        slug: encodeURIComponent(issue.title),
        link: `/blog/${encodeURIComponent(issue.title)}`,
        original: issue,
        tags: [],
      });
    }
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts!;
  }
};

export async function getAllPosts() {
  await generatePosts();
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const posts = await getAllPosts();
  const post = posts?.find(({ slug: postSlug }) => postSlug === slug);
  if (!post) throw Error(`${slug} is not found`);
  return post;
}
