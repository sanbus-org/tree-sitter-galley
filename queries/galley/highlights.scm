(rule
  name: (variable_symbol) @type)

(symbol_with_procedure
  (variable_symbol) @variable)

(alternative
  "|" @operator)

(exception
  "^" @operator)

(double_quoted_terminal) @string
(raw_quote_terminal) @string.special

(generative_name) @constant.builtin

(comment) @comment

(annotation) @comment (#set! "italic") (#set! priority 110)

(annotation
  (recovery_point
    (terminal
      (_) @comment))) (#set! "italic") (#set! priority 110)

(annotation
  (verbatim_marker
    (terminal
      (_) @comment))) (#set! "italic") (#set! priority 110)

(annotation
  "@" @keyword) (#set! "italic") (#set! priority 111)
