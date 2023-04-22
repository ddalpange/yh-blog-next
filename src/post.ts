import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "/public/blog");

export type Post = {
	title: string;
	thumbnail?: string;
	summary?: string;
	date: Date;
	content: string;
	contentHtml: string;
	slug: string;
	link: string;
	tags: string[];
};

const toHtml = async (content: string) =>
	(await remark().use(html).process(content)).toString();

export async function getPostSlugs(): Promise<string[]> {
	const names = await fs.readdir(postsDirectory);
	const result = names.filter((name) => name.endsWith(".md"));
	return result;
}

export async function getPostBySlug(slug: string): Promise<Post> {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = path.join(postsDirectory, `${realSlug}.md`);
	const fileContents = await fs.readFile(fullPath, "utf8");
	const { data, content } = matter(fileContents);
	const summary =
		data.summary ?? content.split("<!-- more -->")?.at(0)?.trim() ?? "";

	return {
		...data,
		date: new Date(data.date),
		tags: data.tags ?? [],
		content,
		contentHtml: await toHtml(content),
		summary: await toHtml(summary),
		slug: realSlug,
		link: `/blog/${realSlug}`,
	} as Post;
}

export async function getAllPosts() {
	const slugs = await getPostSlugs();
	const posts$ = slugs.map((slug) => getPostBySlug(slug));
	return (await Promise.all(posts$)).sort((post1, post2) =>
		post1.date > post2.date ? -1 : 1,
	);
}
