module.exports = grammar({
  name: 'galley',

  conflicts: $ => [[$.rule]],

  inline: $ => [$.symbol],

  extras: $ => [/[ \t]/],

  rules: {
    source_file: $ => repeat(choice($.rule, $.comment, '\n')),

    comment: $ => seq('#', /[^\n]*/),

    rule: $ => seq(
      field('name', $.variable_symbol),
      optional(field('procedure', $.procedure_tail)),
      '\n',
      repeat1(choice(
        field('alternative', $.alternative),
        $.comment,
        '\n',
      )),
    ),

    alternative: $ => seq(
      '|',
      optional(field('procedure', $.procedure_tail)),
      optional($.rhs),
      '\n',
    ),

    rhs: $ => repeat1(field('symbol', $.symbol_with_procedure)),

    symbol_with_procedure: $ => seq(
      $.symbol,
      optional(field('procedure', $.procedure_tail)),
    ),

    symbol: $ => choice(
      $.variable_symbol,
      $.double_quoted_terminal,
      $.single_quoted_terminal,
      $.generative_terminal,
    ),

    variable_symbol: $ => token(choice(
      /_[A-Z][a-zA-Z0-9_]*/,
      /[A-Z][a-zA-Z0-9_]*/,
    )),

    procedure_tail: $ => repeat1(seq('@', field('name', $.procedure_name))),

    procedure_name: $ => /[a-z][a-zA-Z0-9_]*/,

    double_quoted_terminal: $ => seq(
      '"',
      repeat(choice(
        /\\x[0-9a-fA-F]+/,
        /\\./,
        /[^"\\]/,
      )),
      '"',
    ),

    single_quoted_terminal: $ => seq(
      "'",
      repeat(/[^\x03]/),
      '\x03',
    ),

    generative_terminal: $ => seq(
      field('name', $.generative_name),
      repeat($.exception),
    ),

    generative_name: $ => choice(
      'lowercase_letter',
      'uppercase_letter',
      'block_start',
      'block_end',
      'whitespace',
      'punctuation',
      'character',
      'operator',
      'new_line',
      'digit',
      'letter',
      'space',
    ),

    exception: $ => seq('^', $.terminal),

    terminal: $ => choice($.double_quoted_terminal, $.single_quoted_terminal),
  },
});