document.addEventListener('DOMContentLoaded', function () {
    if (typeof tippy === 'undefined') return;

    const content = {
        es: `
            <div style="text-align:left;">
                <strong>Cómo usar</strong>
                <ol style="margin:6px 0 0; padding-left:18px;">
                    <li>- Describe en lenguaje natural el Excel que deseas crear. La IA generará automáticamente el formato JSON compatible con el generador.</li>
                    <li>- Revisa el JSON generado y, si lo deseas, realiza ajustes directamente en el editor.</li>
                    <li>- Cuando el resultado sea el esperado, haz clic en <strong>Generar Excel</strong> para descargar el archivo.</li>
                </ol>
            </div>
        `,
        en: `
            <div style="text-align:left;">
                <strong>How to use</strong>
                <ol style="margin:6px 0 0; padding-left:18px;">
                    <li>- Describe in natural language the Excel you want to create. The AI automatically generates the JSON format compatible with the generator.</li>
                    <li>- Review the generated JSON and, if you want, make adjustments directly in the editor.</li>
                    <li>- When the result is what you expect, click <strong>Generate Excel</strong> to download the file.</li>
                </ol>
            </div>
        `
    };

    function pick() {
        return window.currentLang === 'en' ? content.en : content.es;
    }

    const instances = tippy('#promptHelp', {
        allowHTML: true,
        placement: 'right',
        maxWidth: 260,
        content: pick(),
    });

    document.addEventListener('i18n:change', function () {
        instances.forEach(function (inst) { inst.setContent(pick()); });
    });
});
