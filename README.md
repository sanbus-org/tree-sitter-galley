# tree-sitter-galley

[Tree-sitter](https://tree-sitter.github.io/) grammar for [Galley](https://github.com/sanbus-org/galley) `.grm` parser definition files.

## Grammar

Galley `.grm` files describe parser rules, terminals, generative character classes, procedure hooks, and comments. This grammar powers syntax highlighting, indentation, and tag-based navigation in editors that support Tree-sitter.

## Development

```sh
tree-sitter generate
tree-sitter test
```

## Queries

| Query | Path |
|-------|------|
| Highlights | `queries/galley/highlights.scm` |
| Tags | `queries/galley/tags.scm` |
| Indents | `queries/galley/indents.scm` |

## License

MIT