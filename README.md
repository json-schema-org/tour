# Tour of JSON Schema

This repository contains the code for the Tour of JSON Schema project.
https://tour.json-schema.org

# Development

The project is built using next.js.

After cloning the repository, run the following command to install the dependencies:

```bash
pnpm install
```

To start the development server, run the following command:

```bash
pnpm dev
```

> when you run `pnpm dev`, a file named `outline.json` will be created in th `/content` directory. This file is used to generate the table of contents for the website.

(make sure you run tests before pushing your changes)
To run the tests, run the following command:

```bash 
pnpm test
```


# Content

### Writing MDX

The content written in [MDX](https://mdxjs.com/), a markdown format that supports JSX syntax. This allows us to embed React components in the docs. See the [GitHub Markdown Guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) for a quick overview of markdown syntax.

### VSCode

#### Extensions

We recommend the following extensions for VSCode users:

- [MDX](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx): Intellisense and syntax highlighting for MDX.
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): Format MDX files on save.

## File Structure

the content of each step is stored in the `/content` directory with the following structure:

```

├── 01-introduction
│   ├── index.mdx
│   ├── 01-welcome
│       ├── instructions.mdx
│       ├── code.ts
│   ├── 02-what-is-json-schema
│       ├── instructions.mdx
│       ├── code.ts
├── 02-types
│   ├── index.mdx
│   ├── 01-primitive-types
│       ├── instructions.mdx
│       ├── code.ts
│   ├── 02-arrays
│       ├── instructions.mdx
│       ├── code.ts

```

The instructions.mdx file holds the content the users sees, and the code.ts file holds template code and the logic to validate user provided schemas

## MDX Components Guide

### GoodToKnowBox 

A box that displays a tips or any messages in a box. 

**Props:**
- `title`: The title of the box (default: "Good to know")
- `children`: The content of the box

**Example:**
```md
<GoodToKnowBox title="Tips">
  This is a good to know box
</GoodToKnowBox>
```
### CodeSnippet

A code block that displays the code with syntax highlighting.

**Props:**
- `highlightLineStart`: The line number to start highlighting
- `highlightLineEnd`: The line number to end highlighting (default: highlight only one line)
- `startingLineNumber`: The starting line number of the code block (default: 1)
- `showLineNumbers`: Whether to show line numbers (default: true) 

**Example:**
```md
<CodeSnippet highlightLineStart={1} highlightLineEnd={2}>
{
  "name": "John Doe",
}
</CodeSnippet>
```
### SideEditorLink

A link that focuses the editor on the right side of the screen.

**Props:** None 

**Example:**
```md
<SideEditorLink />
```