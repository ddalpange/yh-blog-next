
import { getAllPosts, getPostBySlug } from "~/post";
import { format } from "date-fns";

export default async function Post(props: any) {
  const post = await getPostBySlug(props.params.slug);
  return (
    <article className="prose">
      <h1>
        {post.title}  
      </h1>
      <caption>
        {format(post.date, "yyyy/MM/dd")}  
      </caption>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}