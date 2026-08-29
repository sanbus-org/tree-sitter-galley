(rule
  name: (variable_symbol) @type)

(symbol_with_procedure
  (variable_symbol) @variable)

(alternative
  "|" @operator)

(double_quoted_terminal) @string
(raw_quote_terminal) @string.special

(generative_name) @constant.builtin

; Generative suffix exceptions: "^" + terminal after generative (e.g. character^"\u{22}"^"\n"^"\\")
; Like hooks: marker (^) distinct from content — @keyword (purple) + @comment (dark gray italic)
(exception
  "^" @keyword (#set! "italic") (#set! priority 125))

(exception
  (terminal
    (double_quoted_terminal) @comment (#set! "italic") (#set! priority 125)))

(exception
  (terminal
    (raw_quote_terminal) @comment (#set! "italic") (#set! priority 125)))

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
