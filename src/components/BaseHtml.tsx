import { Children } from "typed-html";

export const BaseHtml = ({ children }: Children) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/htmx.org@1.9.4""></script>
  <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
  <title>BETH TODO</title>
</head>
${children}
`;
