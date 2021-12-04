import React from "react";

export type Categoryprops = "food" | "cloth" | "etc" | string;

export const Category: React.FC<Categoryprops> = (props: Categoryprops) => {
  return <img className="w-full h-full object-fill" src={"/" + props} />;
};

export default Category;
