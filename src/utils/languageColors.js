const colors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Java: '#b07219',
  'C#': '#178600',
  C: '#555555',
  'C++': '#f34b7d',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  TeX: '#3D6117',
  Vue: '#41b883',
  SCSS: '#c6538c',
}

export function getLanguageColor(lang) {
  return colors[lang] || '#808080'
}
