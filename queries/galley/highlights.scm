(rule
  name: (variable_symbol) @type)

(symbol_with_procedure
  (variable_symbol) @variable)

(alternative
  "|" @operator)

(procedure_tail
  "@" @attribute
  (procedure_name) @function)

(exception
  "^" @operator)

(double_quoted_terminal) @string
(raw_quote_terminal) @string.special

(generative_name) @constant.builtin

(comment) @comment