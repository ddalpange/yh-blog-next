/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import "./globals.css";

export const metadata = {
	title: "Yozzing Blog",
	description: "개발글과 에세이를 씁니다.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" data-theme="retro">
			<body className="flex flex-col items-center h-screen h-[100svh]">
				<div className="w-full max-w-3xl flex-grow">
					<div className="navbar bg-base-100">
						<div className="flex-1">
							<Link
								className="p-2 hover:underline md:text-2xl font-bold flex gap-4 items-center"
								href="/"
							>
								Yozzing Blog
							</Link>
						</div>
						<div className="flex-none">
							<div className="tabs">
								<Link className="tab" href="/engineering">
									엔지니어링
								</Link>
								<Link className="tab" href="/essay">
									에세이
								</Link>
								<a className="tab" href="https://github.com/ddalpange">
									<div className="avatar">
										<div className="w-8 rounded-full">
											<img src="/blog/images/profile.jpeg" />
										</div>
									</div>
								</a>
							</div>
						</div>
					</div>
					<div className="p-4 pb-10">{children}</div>
				</div>
			</body>
		</html>
	);
}
