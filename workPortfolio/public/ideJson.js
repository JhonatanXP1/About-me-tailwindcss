const oneMonokaiTheme = {
    base: 'vs-dark',
    inherit: true,
    rules: [
        { token: 'comment',             foreground: '5c6370', fontStyle: 'italic' },
        { token: 'keyword',             foreground: 'c678dd' },
        { token: 'keyword.operator',    foreground: '56b6c2' },
        { token: 'string',              foreground: '98c379' },
        { token: 'string.escape',       foreground: '56b6c2' },
        { token: 'number',              foreground: 'd19a66' },
        { token: 'constant',            foreground: 'd19a66' },
        { token: 'type',                foreground: 'e5c07b' },
        { token: 'class',               foreground: 'e5c07b' },
        { token: 'function',            foreground: '61afef' },
        { token: 'variable',            foreground: 'e06c75' },
        { token: 'variable.parameter',  foreground: 'abb2bf' },
        { token: 'operator',            foreground: '56b6c2' },
        { token: 'tag',                 foreground: 'e06c75' },
        { token: 'attribute.name',      foreground: 'd19a66' },
        { token: 'attribute.value',     foreground: '98c379' },
        { token: 'regexp',              foreground: '56b6c2' },
        { token: 'delimiter',           foreground: 'abb2bf' },
        { token: 'key',                 foreground: 'e06c75' },
    ],
    colors: {
        'editor.background':                  '#282c34',
        'editor.foreground':                  '#abb2bf',
        'editorLineNumber.foreground':        '#495162',
        'editorLineNumber.activeForeground':  '#abb2bf',
        'editorCursor.foreground':            '#528bff',
        'editor.selectionBackground':         '#3e4451',
        'editor.lineHighlightBackground':     '#2c313c',
        'editorIndentGuide.background1':      '#3b4048',
        'editorBracketMatch.background':      '#515a6b',
        'editorBracketMatch.border':          '#515a6b',
        'editor.selectionHighlightBackground':'#3e4451',
        'scrollbar.shadow':                   '#00000000',
        'editorWidget.background':            '#21252b',
        'input.background':                   '#1d2026',
    }
};

(function preloadMonaco() {
    const loader = document.createElement('script');
    loader.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs/loader.js';
    loader.onload = function () {
        require.config({
            paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs' }
        });
        require(['vs/editor/editor.main'], function () {
            monaco.editor.defineTheme('one-monokai', oneMonokaiTheme);
            window._monacoReady = true;
            window.dispatchEvent(new CustomEvent('monacoReady'));
        });
    };
    document.head.appendChild(loader);
})();

window.addEventListener('animacionTerminada', function () {
    const container = document.getElementById('ideJson');
    if (!container) return;

    function mountEditor() {
        monaco.editor.create(container, {
            value: '{\n  \n}',
            language: 'json',
            theme: 'one-monokai',
            minimap: { enabled: false },
            automaticLayout: true,
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
        });
    }

    if (window._monacoReady) {
        mountEditor();
    } else {
        window.addEventListener('monacoReady', mountEditor, { once: true });
    }
});
