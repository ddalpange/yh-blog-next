import { getAllPosts } from "~/post";
import { PostView } from "~/app/components/PostView";
import { Intro } from "../components/Intro";

export default async function Engineering() {
	const posts = await getAllPosts();

	return (
		<main>
			<Intro />
			{posts
				.filter((post) => !post.tags.includes("ESSAY"))
				.map((post) => {
					return <PostView key={post.slug} post={post} />;
				})}
		</main>
	);
}
