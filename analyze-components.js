// Component Dependency Analyzer
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const componentDirs = [
  './components',
  './app',
  './registry'
];

// Store component relationships
const componentMap = new Map();

// Find all component files (tsx, jsx)
function findComponentFiles() {
  const output = execSync('Get-ChildItem -Path . -Recurse -Include "*.tsx","*.jsx" | Where-Object { $_.FullName -notlike "*node_modules*" -and $_.FullName -notlike "*.next*" } | Select-Object -ExpandProperty FullName', { shell: 'powershell.exe' }).toString();
  return output.split('\r\n').filter(Boolean);
}

// Extract imports from a file
function extractImports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const imports = [];
    
    // Match import statements
    const importRegex = /import\s+(?:{([^}]+)}|\s*([^\s{},]+)\s*)(?:\s*,\s*{([^}]+)})?\s+from\s+['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      const namedImports = match[1] ? match[1].split(',').map(i => i.trim().split(' as ')[0]) : [];
      const defaultImport = match[2] ? [match[2].trim()] : [];
      const additionalNamedImports = match[3] ? match[3].split(',').map(i => i.trim().split(' as ')[0]) : [];
      const source = match[4];
      
      // Only consider local component imports (not node modules)
      if (!source.startsWith('.') && !source.startsWith('@/') && !source.startsWith('/')) continue;
      
      const allImports = [...defaultImport, ...namedImports, ...additionalNamedImports].filter(Boolean);
      imports.push({ imports: allImports, source });
    }
    
    return imports;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return [];
  }
}

// Resolve import path to actual file path
function resolveImportPath(importPath, currentFilePath) {
  if (importPath.startsWith('@/')) {
    // Handle absolute imports (@/...)
    const basePath = importPath.replace('@/', './');
    
    // Try different extensions and index files
    const possiblePaths = [
      `${basePath}.tsx`,
      `${basePath}.jsx`,
      `${basePath}.js`,
      `${basePath}/index.tsx`,
      `${basePath}/index.jsx`,
      `${basePath}/index.js`
    ];
    
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        return path.resolve(possiblePath);
      }
    }
  } else if (importPath.startsWith('.')) {
    // Handle relative imports
    const dirName = path.dirname(currentFilePath);
    const basePath = path.join(dirName, importPath);
    
    // Try different extensions and index files
    const possiblePaths = [
      `${basePath}.tsx`,
      `${basePath}.jsx`,
      `${basePath}.js`,
      `${basePath}/index.tsx`,
      `${basePath}/index.jsx`,
      `${basePath}/index.js`
    ];
    
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        return path.resolve(possiblePath);
      }
    }
  }
  
  return null;
}

// Process a component file
function processComponentFile(filePath) {
  const componentName = path.basename(filePath, path.extname(filePath));
  
  if (!componentMap.has(filePath)) {
    componentMap.set(filePath, {
      name: componentName,
      path: filePath,
      imports: new Set(),
      importedBy: new Set()
    });
  }
  
  const imports = extractImports(filePath);
  
  imports.forEach(({ imports: importNames, source }) => {
    const resolvedPath = resolveImportPath(source, filePath);
    if (resolvedPath) {
      const component = componentMap.get(filePath);
      component.imports.add(resolvedPath);
      
      if (!componentMap.has(resolvedPath)) {
        const importedComponentName = path.basename(resolvedPath, path.extname(resolvedPath));
        componentMap.set(resolvedPath, {
          name: importedComponentName,
          path: resolvedPath,
          imports: new Set(),
          importedBy: new Set()
        });
      }
      
      const importedComponent = componentMap.get(resolvedPath);
      importedComponent.importedBy.add(filePath);
    }
  });
}

// Build the dependency tree
function buildDependencyTree() {
  const files = findComponentFiles();
  
  // First pass: process all files
  files.forEach(file => {
    processComponentFile(file);
  });
  
  return componentMap;
}

// Generate human-readable output
function generateOutput(componentMap) {
  const output = [];
  
  output.push('# Component Dependency Analysis');
  output.push('');
  
  // Sort components by most used first
  const sortedComponents = Array.from(componentMap.entries())
    .sort((a, b) => b[1].importedBy.size - a[1].importedBy.size);
  
  output.push('## Components by Usage (Most Used First)');
  output.push('');
  
  for (const [filePath, component] of sortedComponents) {
    const relativePath = path.relative('.', filePath).replace(/\\/g, '/');
    
    if (component.importedBy.size > 0) {
      output.push(`### ${component.name} (${relativePath})`);
      output.push(`Used by ${component.importedBy.size} components:`);
      output.push('');
      
      // List components that import this component
      const usedBy = Array.from(component.importedBy)
        .map(path => componentMap.get(path))
        .sort((a, b) => a.name.localeCompare(b.name));
      
      usedBy.forEach(user => {
        const userRelativePath = path.relative('.', user.path).replace(/\\/g, '/');
        output.push(`- ${user.name} (${userRelativePath})`);
      });
      
      output.push('');
    }
  }
  
  output.push('## Components with Dependencies');
  output.push('');
  
  // Sort alphabetically by name for this section
  const alphabeticalComponents = Array.from(componentMap.entries())
    .sort((a, b) => a[1].name.localeCompare(b[1].name));
  
  for (const [filePath, component] of alphabeticalComponents) {
    const relativePath = path.relative('.', filePath).replace(/\\/g, '/');
    
    if (component.imports.size > 0) {
      output.push(`### ${component.name} (${relativePath})`);
      output.push(`Imports ${component.imports.size} components:`);
      output.push('');
      
      // List components that this component imports
      const imports = Array.from(component.imports)
        .map(path => componentMap.get(path))
        .filter(Boolean) // Filter out any undefined entries
        .sort((a, b) => a.name.localeCompare(b.name));
      
      imports.forEach(imported => {
        const importedRelativePath = path.relative('.', imported.path).replace(/\\/g, '/');
        output.push(`- ${imported.name} (${importedRelativePath})`);
      });
      
      output.push('');
    }
  }
  
  return output.join('\n');
}

// Main execution
const dependencies = buildDependencyTree();
const report = generateOutput(dependencies);

// Write report to file
fs.writeFileSync('component-dependencies.md', report);

console.log('Component dependency analysis complete. See component-dependencies.md for results.'); 