/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.SITE_URL || "https://ddalpange.github.io",
	generateRobotsTxt: true, // (optional),
	outDir: "out",
	// ...other options
};
