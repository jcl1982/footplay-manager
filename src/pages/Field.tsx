
import React, { useState } from 'react';
import { Layout } from '@/components/ui/Layout';
import { FieldVisualization } from '@/components/ui/FieldVisualization';
import { fieldPlayers } from '@/lib/data';
import { Tablet, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

const formations = [
  { name: '4-3-3', value: '4-3-3' },
  { name: '4-2-3-1', value: '4-2-3-1' },
  { name: '3-4-3', value: '3-4-3' },
  { name: '4-4-2', value: '4-4-2' },
  { name: '3-5-2', value: '3-5-2' },
];

const Field = () => {
  const [currentFormation, setCurrentFormation] = useState('4-3-3');
  
  return (
    <Layout title="Visualisation du terrain">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card rounded-xl p-5 lg:col-span-2 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Disposition tactique</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <RotateCcw className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <FieldVisualization 
            players={fieldPlayers}
            formation={currentFormation}
          />
        </div>
        
        <div className="space-y-6 animate-fade-in">
          <div className="glass-card rounded-xl p-5">
            <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
              <Tablet className="mr-2 h-5 w-5 text-primary" />
              Tactique
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formation
                </label>
                <select 
                  value={currentFormation}
                  onChange={(e) => setCurrentFormation(e.target.value)}
                  className="w-full bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  {formations.map(formation => (
                    <option key={formation.value} value={formation.value}>
                      {formation.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Style de jeu
                </label>
                <select 
                  className="w-full bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option>Possession</option>
                  <option>Contre-attaque</option>
                  <option>Pressing haut</option>
                  <option>Défensif</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intensité de pressing
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  defaultValue="7"
                  className="w-full" 
                />
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Joueurs sur le terrain
            </h3>
            <div className="space-y-2">
              {fieldPlayers.slice(0, 5).map(player => (
                <div key={player.id} className="flex items-center justify-between p-2 bg-white/70 rounded-lg">
                  <div className="flex items-center">
                    <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center mr-2">
                      <span className="text-sm font-semibold text-primary">{player.number}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{player.name}</p>
                      <p className="text-xs text-gray-500">{player.position}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              <button className="w-full text-sm text-primary font-medium hover:underline text-center py-2">
                Voir tous les joueurs
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Field;
