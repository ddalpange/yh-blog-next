/* eslint-disable @next/next/no-img-element */

import React from "react";
import { Post } from "../../post";
import Link from "next/link";
import { formatRelative } from "date-fns";

type Props = {
  post: Post
};

export const PostView = (props: Props) => {
  const { post } = props;
  const { link, title, summary, thumbnail, date } = post;
  return <div className="py-6 flex flex-row-reverse gap-6 md:gap-10 items-start">
    {thumbnail && <Link href={link}>
      <img src={thumbnail} alt={title} className="w-20 h-20 md:w-40 md:h-40 rounded bg-base-200 object-cover" />
    </Link>}
    <div className="flex flex-col gap-1 flex-1">
      <h2 className="text-2xl font-bold">
        <Link href={link} className='hover:underline'>
          {title}
        </Link>
      </h2>
      <p className="text-sm text-base-content/70">
        {formatRelative(date, Date.now())}
      </p>
      {
        summary && <p className="text-sm text-base-content/90" dangerouslySetInnerHTML={{ __html: summary }}>
        </p>
      }
    </div>
  </div>
}