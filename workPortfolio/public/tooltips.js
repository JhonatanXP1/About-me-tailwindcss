document.addEventListener('DOMContentLoaded', () => {
    if (typeof tippy === 'undefined') return;

    tippy('#promptHelp', {
        allowHTML: true,
        placement: 'right',
        maxWidth: 260,
        content: `
            <div style="text-align:left;">
                <strong>Cómo usar</strong>
                <ol style="margin:6px 0 0; padding-left:18px;">
                    <li>Describe en el prompt qué datos necesitas.</li>
                    <li>Pega o edita el JSON en el editor de abajo.</li>
                    <li>Genera el archivo y descárgalo.</li>
                </ol>
            </div>
        `,
    });
});
