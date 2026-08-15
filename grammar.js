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
      repeat(field('recovery', $.recovery)),
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
      repeat(field('recovery', $.recovery)),
      optional(field('procedure', $.procedure_tail)),
      optional($.rhs),
      '\n',
    ),

    rhs: $ => repeat1(field('symbol', $.symbol_with_procedure)),

    symbol_with_procedure: $ => seq(
      $.symbol,
      repeat(field('recovery', $.recovery)),
      optional(field('procedure', $.procedure_tail)),
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

    procedure_tail: $ => repeat1(seq('@', field('name', $.procedure_name))),

    procedure_name: $ => /[a-z][a-zA-Z0-9_]*/,

    recovery: $ => seq(
      '!',
      field('point', $.recovery_point),
    ),

    recovery_point: $ => choice(
      seq('^', field('terminal', $.terminal)),
      prec(1, seq(field('terminal', $.terminal), '^')),
      $.verbatim_marker,
    ),

    verbatim_marker: $ => choice(
      '>>',
      seq('>', choice(
        seq('^', field('terminal', $.terminal)),
        prec(1, seq(field('terminal', $.terminal), '^')),
        field('terminal', $.terminal),
      )),
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