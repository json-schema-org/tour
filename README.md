# Tour of JSON Schema

This repository contains the code for the Tour of JSON Schema project.
https://json-schema-org.github.io/tour

# Development

The project is built using next.js.

after cloning the repository, create a `.env` file in the root of the project with the following content:

```python
MODE = "local"
```

Then run the following command to install the dependencies:

```bash
yarn install
```

To start the development server, run the following command:

```bash
yarn dev
```

> when you run `yarn dev`, a file named `outline.json` will be created in th `/content` directory. This file is used to generate the table of contents for the website.

# Content

### Writing MDX

The content written in [MDX](https://mdxjs.com/), a markdown format that supports JSX syntax. This allows us to embed React components in the docs. See the [GitHub Markdown Guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) for a quick overview of markdown syntax.

### VSCode

#### Previewing Changes Locally

VSCode has a built-in markdown previewer that you can use to see your edits locally. To enable the previewer for MDX files, you'll need to add a configuration option to your user settings.

Open the command palette (`⌘ + ⇧ + P` on Mac or `Ctrl + Shift + P` on Windows) and search from `Preferences: Open User Settings (JSON)`.

Then, add the following line to your `settings.json` file:

```json filename="settings.json"
{
  "files.associations": {
    "*.mdx": "markdown"
  }
}
```

Next, open the command palette again, and search for `Markdown: Preview File` or `Markdown: Open Preview to the Side`. This will open a preview window where you can see your formatted changes.

#### Extensions

We also recommend the following extensions for VSCode users:

- [MDX](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx): Intellisense and syntax highlighting for MDX.
- [Grammarly](https://marketplace.visualstudio.com/items?itemName=znck.grammarly): Grammar and spell checker.
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
