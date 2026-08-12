import { useState } from 'react';
import moviesData from './data/movies.json';
import type { Movie } from './types';

export function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'year' | 'title'>('year');

  // 1. Filtrar os filmes apenas pelo título
  const filteredMovies = (moviesData as Movie[]).filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Ordenar os filmes filtrados
  const sortedMovies = filteredMovies.sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      return a.year - b.year;
    }
  });

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Filmes da Marvel</h1>

      {/* Controles de Busca e Ordenação */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <div>
          <label><strong>Buscar: </strong></label>
          <input
            type="text"
            placeholder="Título do filme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.4rem' }}
          />
        </div>

        <div>
          <label><strong>Ordenar por: </strong></label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'year' | 'title')}
            style={{ padding: '0.4rem' }}
          >
            <option value="year">Ano de Lançamento</option>
            <option value="title">Título</option>
          </select>
        </div>
      </div>

      {/* Tabela de Resultados */}
      <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>Título</th>
            <th>Ano</th>
          </tr>
        </thead>
        <tbody>
          {sortedMovies.length > 0 ? (
            sortedMovies.map((movie) => (
              <tr key={movie.id}>
                <td><strong>{movie.title}</strong></td>
                <td>{movie.year}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} style={{ textAlign: 'center' }}>
                Nenhum filme encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;