"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { Post } from "~/app/post";
import { DiscussionEmbed } from "disqus-react";

type Props = {
  post: Post;
};

export const Disqus = ({ post }: Props) => {
  const disqusShortname = "https-ddalpange-github-com";
  const disqusConfig = {
    url: `https://ddalpange.github.io/blog/${post.slug}`,
    identifier: post.slug, // Single post id
    title: post.title, // Single post title
  };
  return (
    <div className="w-5/6">
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};
