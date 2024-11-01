import clone from "lodash/clone";
import { fonts, lineHeights, sizes } from "../components/config";

export const changeSize = (type: any) => {
  if (!sizes[type]) {
    return {};
  }
  const style = {
    fontSize: sizes[type],
    lineHeight: lineHeights[type],
  };
  return {
    div: clone(style),
    span: clone(style),
    p: clone(style),
    a: clone(style),
  };
};

export const changeFont = (type: any) => {
  if (!(fonts as any)[type]) {
    return {};
  }
  return {
    div: clone((fonts as any)[type]),
    span: clone((fonts as any)[type]),
    p: clone((fonts as any)[type]),
    a: clone((fonts as any)[type]),
  };
};

export const changeLineHeight = (number: number) => {
  const style = {
    lineHeight: number,
  };
  return {
    // div: clone(style),
    span: clone(style),
    p: clone(style),
    a: clone(style),
  };
};

export const changeColor = (color: string) => {
  return {
    div: { color },
    span: { color },
    p: { color },
  };
};
