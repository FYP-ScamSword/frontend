import type { LoaderArgs } from "@remix-run/node";

export const loader = async ({ params }: LoaderArgs) => {
  if(!params || ! params.url){
    throw new Error('URL not provided!');
  }
  const url = params.url
  const response = await fetch( `${process.env.SCREENSHOT_BACKEND}/screenshot?url=${url}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to fetch data1');
  }
};
