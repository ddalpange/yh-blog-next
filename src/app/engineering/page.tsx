import { getAllPosts } from "~/post";
import { PostView } from "~/app/components/PostView";

export default async function Engineering() {
	const posts = await getAllPosts();

	return (
		<main>
			{posts
				.filter((post) => !post.tags.includes("ESSAY"))
				.map((post) => {
					return <PostView key={post.slug} post={post}></PostView>;
				})}
		</main>
	);
}
