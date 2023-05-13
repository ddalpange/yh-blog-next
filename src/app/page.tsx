import { redirect } from "next/navigation";
import { getAllPosts } from "~/app/post";
import { PostView } from "./components/PostView";

export default async function Home() {
	redirect("/engineering");
	const posts = await getAllPosts();

	return (
		<main>
			{posts.map((post) => {
				return <PostView key={post.slug} post={post} />;
			})}
		</main>
	);
}
