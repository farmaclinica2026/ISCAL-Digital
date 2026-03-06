import React, { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelect }) => {
  // Referência para manter uma única instância do AudioContext
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Inicializa o contexto de áudio
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
      }
    }
    return audioCtxRef.current;
  };

  // Efeito para limpar o contexto ao desmontar o componente (opcional, mas boa prática)
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);
  
  // Função para gerar um som de "toque" suave
  const playTapSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      // Navegadores suspendem contextos criados sem interação do usuário. 
      // Retomamos se necessário.
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Configuração para um som de "click/tap" suave
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (error) {
      console.error("Erro ao reproduzir som:", error);
    }
  };

  const handleSelect = (category: string) => {
    playTapSound();
    onSelect(category);
  };

  return (
    <div>
      {/* Dropdown de Categorias - Visível em todas as resoluções */}
      <div className="relative mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => handleSelect(e.target.value)}
          className="appearance-none w-full bg-blue-50 border border-blue-200 text-blue-900 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-shadow cursor-pointer font-medium"
        >
          <option value="Todos">Todas as Categorias</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-blue-500">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;