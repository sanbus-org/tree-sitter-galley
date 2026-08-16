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
      repeat(field('annotation', $.annotation)),
      '\n',
      repeat1(choice(
        field('alternative', $.alternative),
        $.comment,
        '\n',
      )),
    ),

    alternative: $ => seq(
      '|',
      repeat(field('annotation', $.annotation)),
      optional($.rhs),
      '\n',
    ),

    rhs: $ => repeat1(field('symbol', $.symbol_with_procedure)),

    symbol_with_procedure: $ => seq(
      $.symbol,
      repeat(field('annotation', $.annotation)),
    ),

    symbol: $ => choice(
      $.variable_symbol,
      $.double_quoted_terminal,
      $.raw_quote_terminal,
      $.generative_terminal,
    ),

    variable_symbol: $ => token(choice(
      /_[A-Z][a-zA-Z0-9_]*/,
      /[A-Z][a-zA-Z0-9_]*/,
    )),

    procedure_name: $ => /[a-z][a-zA-Z0-9_]*/,

    annotation: $ => seq(
      '@',
      choice(
        field('procedure', $.procedure_name),
        seq('!', field('point', $.recovery_point)),
        seq('>', field('marker', $.verbatim_marker)),
      ),
    ),

    recovery_point: $ => choice(
      seq('^', field('terminal', $.terminal)),
      prec(1, seq(field('terminal', $.terminal), '^')),
    ),

    verbatim_marker: $ => choice(
      '>',
      seq('^', field('terminal', $.terminal)),
      prec(1, seq(field('terminal', $.terminal), '^')),
      field('terminal', $.terminal),
    ),

    double_quoted_terminal: $ => seq(
      '"',
      repeat(choice(
        /\\u\{[0-9a-fA-F]+\}/,
        /\\x[0-9a-fA-F]+/,
        /\\./,
        /[^"\\]/,
      )),
      '"',
    ),

    raw_quote_terminal: $ => /\\"~[^~\n]*~"/,

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
      'hex_digit',
      'letter',
      'space',
      'utf8_lead_two',
      'utf8_lead_three_general',
      'utf8_lead_four_general',
      'utf8_continuation',
      'utf8_continuation_80_8f',
      'utf8_continuation_80_9f',
      'utf8_continuation_90_bf',
      'utf8_continuation_a0_bf',
    ),

    exception: $ => seq('^', $.terminal),

    terminal: $ => choice($.double_quoted_terminal, $.raw_quote_terminal),
  },
});