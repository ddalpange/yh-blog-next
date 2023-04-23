/* eslint-disable @next/next/no-img-element */

import React, { FC } from "react";
import parse from 'html-react-parser'

type Props = {
	content: string;
  className?: string;
};

export const HtmlString: FC<Props> = ({content, ...props}) => {
  return <div {...props}>
    {parse(content)}
  </div>
};
