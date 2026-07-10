import XCTest
import SwiftTreeSitter
import TreeSitterGalley

final class TreeSitterGalleyTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_galley())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Galley grammar")
    }
}
