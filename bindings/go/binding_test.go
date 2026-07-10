package tree_sitter_galley_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_galley "github.com/sanbus-org/tree-sitter-galley/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_galley.Language())
	if language == nil {
		t.Errorf("Error loading Galley grammar")
	}
}
