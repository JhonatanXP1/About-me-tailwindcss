(function () {
    const STORAGE_KEY = 'lang';

    function bullet(color, text) {
        return '<li class="flex items-center">' +
            '<svg class="min-w-8  max-w-8 min-h-8 max-h-8 sm:min-w-15 sm:max-w-15 sm:min-h-15 sm:max-h-15 text-' + color + '" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">' +
            '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m10 16 4-4-4-4"/></svg>' +
            text + '</li>';
    }

    // Solo se define el inglés; el español es el contenido original del HTML.
    const translations = {
        en: {
            'role': '<span class="point-index"></span> Software Engineer',
            'hero.title': '<span class="monserat-bold-700">Full Stack Developer <br></span>\n' +
                '<span class="text-[#a8a8a8] ">building the <br> bridge between <span class="text-emerald-400 italic">backend</span> <br>\n' +
                '<span class="text-neutral-50">and user experience.</span> </span>',
            'hero.years': ' <span class=" text-neutral-100 monserat-bold-400 not-italic! text-5xl block mr-2">+3</span>  Years connecting <br> ideas.',
            'hero.desc': '+3 years building web solutions that turn manual processes into scalable, ' +
                'secure and high-performance platforms. Currently developing financial systems and ' +
                'optimizing architectures to improve performance and reliability.',

            'about.title': 'Professional Profile',
            'about.heading': 'I build the <span class="text-emerald-400 italic">stack</span> and the flows that multiply the team’s impact',
            'about.intro': 'From Puebla, Mexico, collaborating with cross-functional teams. I build and deploy ' +
                'end-to-end full-stack solutions — frontend (Angular), backend (.NET) and infrastructure (Linux). ' +
                'I connect business logic with technical architecture to accelerate the team’s development and ' +
                'ensure scalable, maintainable products.',
            'about.card1': '<span>01</span><br>\n<span class="text-base text-neutral-50 font-semibold">Collaborative development</span>\n<br>\n<br>\n' +
                'I don’t believe in silos. I optimize the code and structure the architecture with the developers ' +
                'who come next in mind. My approach keeps collaboration flows smooth, reducing technical friction ' +
                'and multiplying the team’s delivery speed.',
            'about.card2': '<span>02</span><br>\n<span class="text-base text-neutral-50 font-semibold">Architecture built to grow</span>\n<br>\n<br>\n' +
                'I don’t stop at the code layer: I design data architecture, role-based filtering with EF Core ' +
                'and deployments on Docker/Linux. I take part in every link of the system.',
            'about.card3': '<span>03</span><br>\n<span class="text-base text-neutral-50 font-semibold">Trust built in</span>\n<br>\n<br>\n' +
                'Security isn’t an extra, it’s part of the design. I integrate payment gateways (Openpay, Conekta, ' +
                'Digital Femsa) and JWT authentication with refresh token rotation, building systems both the team ' +
                'and the end user can trust.',

            'skills.title': 'Technical Skills',
            'skills.h4': '<span class="text-lg text-[#fc4b08]">04.</span> Integrations & Payment Processing',
            'skills.htmlcss': ' Advanced HTML / CSS',
            'skills.uidesign': 'Custom UI design',
            'skills.bash': 'Bash Scripting (Task automation)',
            'skills.payments': '→&nbsp;&nbsp;&nbsp;&nbsp;Integration of payment gateways such as <b>OpenPay, EVO and Digital FEMSA</b>.<br>\n' +
                '→&nbsp;&nbsp;&nbsp;&nbsp;Implementation of algorithms for generating and validating bank references.<br>\n' +
                '→&nbsp;&nbsp;&nbsp;&nbsp;Design of backend flows for secure payment processing, transactional state handling and integrity validations.<br>\n' +
                '→&nbsp;&nbsp;&nbsp;&nbsp;Communication with external services through third-party APIs, error handling, retries and asynchronous responses.<br>',

            'exp.title': 'Experience',
            'exp.t1': 'January 2024 to July 2026',
            'exp.t2': 'March 2024 to August 2025',
            'exp.t3': 'July 2023 to January 2024',
            'exp.p1': '<span class="text-sky-500 text-xl md:text-2xl monserat-bold-600">Full Stack Developer</span><br>\n' +
                ' As part of the development team, my main responsibilities were:\n <br>',
            'exp.p2': '<span class="text-blue-700 text-lg md:text-xl monserat-bold-600">IT Support</span><br>\n' +
                ' As external IT Support, I took part in the operation, integration and maintenance of technology systems, performing the following functions: <br>',
            'exp.p3': '<span class=" text-green-700 text-lg md:text-xl monserat-bold-600">Computer Systems Engineer</span><br>\n' +
                ' During this period I performed duties focused on the support, maintenance and administration of technology infrastructure, standing out in the following activities:<br>',
            'exp.ul1': bullet('sky-500', 'The design and development of modules for a comprehensive educational management system, focused on providing administrative and operational tools for schools.') +
                bullet('sky-500', 'Maintenance and continuous improvement of the system, ensuring its stability, performance and technological updates.') +
                bullet('sky-500', 'Managing client communication for the creation of formats, special requests and requirements analysis.') +
                bullet('sky-500', 'Implementation of integrations with external services, including payment gateways and other complementary platforms.') +
                bullet('sky-500', 'Administration and monitoring of servers in Linux environments, ensuring the availability and security of the infrastructure.') +
                bullet('sky-500', 'Development of Bash scripts to automate server tasks, including deployments, maintenance, resource monitoring and optimization of operational flows.'),
            'exp.ul2': bullet('blue-700', 'Development and implementation of a basic ticketing module to manage potential candidates, focused on tracking the telemarketing area and its integration with the Zoho platform.') +
                bullet('blue-700', 'Integration of RingCentral with Zoho CRM, enabling call management and traceability and client communication.') +
                bullet('blue-700', 'Administration of the hosting that held the website and the internal system, ensuring its availability and correct operation.') +
                bullet('blue-700', 'Preventive and corrective maintenance of computer equipment, ensuring the staff’s operational continuity.'),
            'exp.ul3': bullet('green-700', 'Network configuration and administration, focused on secure interconnection between companies and on managing permissions and access.') +
                bullet('green-700', 'Installation and switching of physical networks, including structured cabling, network devices and connectivity validation.') +
                bullet('green-700', 'Preventive and corrective maintenance of computer equipment, optimizing hardware performance and reducing downtime.') +
                bullet('green-700', 'Installation and configuration of security equipment, such as CCTV surveillance cameras, access control and monitoring devices, ensuring their correct integration into the network.'),

            'dev.title': 'Projects',
            'dev.pill': '<span class="relative inline-flex h-1.5 w-1.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span></span>\n Live demo · hosted on my Linux home server.\n',
            'dev.featured': 'Featured project',
            'dev.excelTitle': 'Simplified Excel Generator',
            'dev.excelDesc': 'Describe the Excel you need. The AI automatically generates the JSON compatible with the Excel generator.',
            'dev.docs': 'Documentation',
            'dev.btnExample': 'Create example with AI',
            'dev.btnGenerate': 'Generate Excel',
            'dev.promptPh': 'Enter the prompt ',
            'dev.devtoolsDesc': '7 Bash tools to automate Git, files and Docker from the terminal, with fuzzy selection (fzf) and global install via symlink.',
            'dev.wip': 'In progress',
            'dev.orbitaDesc': 'Business-warehouse manager (under construction): JWT login, user management, shell layout (sidebar + header) and light/dark theme.',
            'dev.educappDesc': 'Comprehensive educational management system: administrative modules, education management, payments and integrations.',

            'modal.title': 'Keep the JSON editor content?',
            'modal.body': 'The JSON editor content will be sent as part of the prompt. Do you want to keep it or delete it?',
            'modal.no': 'No, delete',
            'modal.yes': 'Yes, keep',
        }
    };

    const originals = new WeakMap();

    function apply(lang) {
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            const key = el.getAttribute('data-i18n');
            if (!originals.has(el)) originals.set(el, el.innerHTML);
            if (lang === 'en' && translations.en[key] != null) {
                el.innerHTML = translations.en[key];
            } else {
                el.innerHTML = originals.get(el);
            }
        });
        document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
            const key = el.getAttribute('data-i18n-ph');
            if (el.getAttribute('data-ph-orig') == null) {
                el.setAttribute('data-ph-orig', el.getAttribute('placeholder') || '');
            }
            el.setAttribute('placeholder',
                (lang === 'en' && translations.en[key] != null) ? translations.en[key] : el.getAttribute('data-ph-orig'));
        });
        document.documentElement.lang = lang;
        localStorage.setItem(STORAGE_KEY, lang);

        document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
            const on = btn.getAttribute('data-lang-btn') === lang;
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
            btn.classList.toggle('text-emerald-400', on);
            btn.classList.toggle('text-[#a1a1aa]', !on);
        });

        window.currentLang = lang;
        document.dispatchEvent(new CustomEvent('i18n:change', { detail: lang }));
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                apply(btn.getAttribute('data-lang-btn'));
            });
        });
        apply(localStorage.getItem(STORAGE_KEY) || 'es');
    });
})();
