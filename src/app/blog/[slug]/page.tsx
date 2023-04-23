import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Metadata } from "next";
import { Disqus } from "~/app/components/Disqus";
import { HtmlString } from "~/app/components/HtmlString";
import { getAllPosts, getPostBySlug } from "~/post";

type Props = {
	params: {
		slug: string;
	};
};

export default async function PostBySlug(props: Props) {
	const post = await getPostBySlug(props.params.slug);
	return (
		<article className="prose max-w-full flex flex-col items-center">
			<span className="mb-2">
				{formatDistanceToNow(post.date, {
					addSuffix: true,
					locale: ko,
				})}
			</span>
			<h1>{post.title}</h1>
			<div>
				<HtmlString className="prose self-center" content={post.contentHtml} />
			</div>
			<Disqus post={post} />
		</article>
	);
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const post = await getPostBySlug(props.params.slug);
	return {
		title: post.title,
		description: post.summary,
		authors: [
			{
				url: "https://github.io/ddalpange",
				name: "ddalpange",
			},
		],
		keywords: post.tags,
	};
}

export async function generateStaticParams() {
	const posts = await getAllPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}
