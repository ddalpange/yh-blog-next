import { redirect } from 'next/navigation';

export default async function Home() {
  redirect("/engineering");
  return <div>Home</div>
}

