import melodia from './assets/fondo-optimizado.mp3';

// main.ts
class AudioPlayer {
    private audio: HTMLAudioElement | null = null;
    private isPlaying: boolean = false;

    constructor() {
        this.initAudio();
        this.setupEventListeners();
    }

    private initAudio(): void {
        // Crear elemento de audio
        this.audio = new Audio(melodia);
        // Configurar propiedades del audio
        this.audio.preload = 'auto'; // Precargar el audio
        this.audio.volume = 0.8; // Volumen entre 0 y 1
        this.audio.loop = true; // No repetir
    }

    private setupEventListeners(): void {
        // Esperar a que TODO esté cargado (DOM + recursos)
        window.addEventListener('load', () => {
            //this.playMelody();
        });

        // También puedes usar DOMContentLoaded si solo necesitas el DOM
        // document.addEventListener('DOMContentLoaded', () => {
        //   this.playMelody();
        // });

        // Manejar interacción del usuario (requerido por algunas políticas de navegadores)
        document.addEventListener('click', () => {
            /*if (this.audio && !this.isPlaying) {
                this.audio.play().catch(e => console.log('Autoplay bloqueado:', e));
            }*/
        });
    }

    private async playMelody(): Promise<void> {
        if (!this.audio) return;

        try {
            // Esperar a que el audio esté listo
            await this.audio.load();

            // Reproducir con manejo de errores
            await this.audio.play();
            this.isPlaying = true;

            console.log('🎵 Melodía reproduciéndose...');

            // Evento cuando termine
            this.audio.addEventListener('ended', () => {
                this.isPlaying = false;
                console.log('🎵 Melodía terminada');
            });

        } catch (error) {
            console.error('Error al reproducir audio:', error);

            // Mostrar botón de reproducción manual si falla
            this.showManualPlayButton();
        }
    }

    private showManualPlayButton(): void {
        const button = document.createElement('button');
        button.textContent = '▶ Reproducir Melodía';
        button.className = 'fixed bottom-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg';
        button.addEventListener('click', () => {
            if (this.audio) {
                this.audio.play();
                button.remove();
            }
        });

        document.body.appendChild(button);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = new AudioPlayer();
});