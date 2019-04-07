;; Red Hat Linux default .emacs initialization file  ; -*- mode: emacs-lisp -*-

(add-to-list 'load-path "/usr/share/emacs/site-lisp/")
(load "haskell-site-file")

(add-to-list 'load-path "/u/brandon/.emacs.d/")
(load "javascript-mode")

;; Set up the keyboard so the delete key on both the regular keyboard
;; and the keypad delete the character under the cursor and to the right
;; under X, instead of the default, backspace behavior.
(global-set-key [delete] 'delete-char)
(global-set-key [kp-delete] 'delete-char)

;; turn on font-lock mode
(global-font-lock-mode t)
;; enable visual feedback on selections
(setq-default transient-mark-mode t)

;; always end a file with a newline
(setq require-final-newline t)

;; stop at the end of the file, not just add lines
(setq next-line-add-newlines nil)

(when window-system
  ;; enable wheelmouse support by default
  (mwheel-install)
  ;; use extended compound-text coding for X clipboard
  (set-selection-coding-system 'compound-text-with-extensions))

(put 'upcase-region 'disabled nil)
(put 'downcase-region 'disabled nil)

(require 'emacs-wiki) 
(require 'planner)
(require 'w3)
;(require 'planner-browser) ;Why isn't this working
(require 'tex-site) ;auctex 

(setq mark-diary-entries-in-calendar t)
(define-key mode-specific-map [?n] 'planner-goto-today)

(add-hook 'haskell-mode-hook 'turn-on-haskell-doc-mode)
(add-hook 'haskell-mode-hook 'turn-on-haskell-indent)
;(add-hook 'haskell-mode-hook 'turn-on-haskell-simple-indent)
(add-hook 'haskell-mode-hook 'font-lock-mode)
(global-set-key [(control meta down-mouse-3)] 'imenu)
(add-hook 'haskell-mode-hook 'imenu-add-menubar-index)

(display-time)
(add-hook 'diary-hook 'appt-make-list)
(diary 0)

(require 'cua)
(CUA-mode t)

(setq x-select-enable-clipboard t)
