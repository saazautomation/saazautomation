import { createElement, type HTMLAttributes, type ReactNode } from "react";

type BoxProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export default function Box({ children, ...props }: BoxProps) {
  return createElement("div", props, children);
}
