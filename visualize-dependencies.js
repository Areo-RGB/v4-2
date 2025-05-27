// Component Dependency Visualizer
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const TOP_COMPONENTS_COUNT = 20; // Number of most-used components to include

// Parse the component dependency file
function parseComponentDependencies(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  const components = new Map();
  let currentComponent = null;
  let isCollectingUsedBy = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect component headers
    if (line.startsWith('### ')) {
      const match = line.match(/### (.+) \((.+)\)/);
      if (match) {
        const componentName = match[1];
        const componentPath = match[2];
        currentComponent = {
          name: componentName,
          path: componentPath,
          usedBy: [],
          imports: []
        };
        components.set(componentPath, currentComponent);
      }
    }
    // Detect "Used by" sections
    else if (line.startsWith('Used by ')) {
      isCollectingUsedBy = true;
    }
    // Detect "Imports" sections
    else if (line.startsWith('Imports ')) {
      isCollectingUsedBy = false;
    }
    // Collect list items
    else if (line.startsWith('- ') && currentComponent) {
      const match = line.match(/- (.+) \((.+)\)/);
      if (match) {
        const refName = match[1];
        const refPath = match[2];
        
        if (isCollectingUsedBy) {
          currentComponent.usedBy.push(refPath);
        } else {
          currentComponent.imports.push(refPath);
        }
      }
    }
  }
  
  return components;
}

// Generate a d3.js visualization
function generateVisualization(components) {
  // Sort components by usage
  const sortedComponents = Array.from(components.values())
    .sort((a, b) => b.usedBy.length - a.usedBy.length);
  
  // Take the top N most used components
  const topComponents = sortedComponents.slice(0, TOP_COMPONENTS_COUNT);
  
  // Create nodes and links for d3 visualization
  const nodes = [];
  const links = [];
  const includedNodes = new Set();
  
  // Add top components as nodes
  topComponents.forEach(component => {
    const nodeId = component.path;
    nodes.push({
      id: nodeId,
      name: component.name,
      path: component.path,
      group: getComponentGroup(component.path),
      usedByCount: component.usedBy.length
    });
    includedNodes.add(nodeId);
  });
  
  // Add relationships between included components
  topComponents.forEach(component => {
    const sourceId = component.path;
    
    // Add links for imports (if target is in our included nodes)
    component.imports.forEach(targetId => {
      if (includedNodes.has(targetId)) {
        links.push({
          source: sourceId,
          target: targetId,
          value: 1
        });
      }
    });
    
    // Add links for usedBy (if target is in our included nodes)
    component.usedBy.forEach(targetId => {
      if (includedNodes.has(targetId)) {
        links.push({
          source: targetId,
          target: sourceId,
          value: 1
        });
      }
    });
  });
  
  // Create HTML file with D3 visualization
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Component Dependency Visualization</title>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <style>
    body { 
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
    }
    .node {
      cursor: pointer;
    }
    .link {
      stroke: #999;
      stroke-opacity: 0.6;
    }
    .node text {
      font-size: 12px;
      fill: #333;
    }
    h1 {
      text-align: center;
    }
    .tooltip {
      position: absolute;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 10px;
      box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
      pointer-events: none;
      opacity: 0;
    }
    .controls {
      text-align: center;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <h1>Component Dependency Visualization</h1>
  <div class="controls">
    <button id="zoom-in">Zoom In</button>
    <button id="zoom-out">Zoom Out</button>
    <button id="reset">Reset</button>
  </div>
  <div id="visualization"></div>
  <div class="tooltip"></div>
  <script>
    // Data
    const data = {
      nodes: ${JSON.stringify(nodes)},
      links: ${JSON.stringify(links)}
    };
    
    // Set up the visualization
    const width = window.innerWidth - 40;
    const height = window.innerHeight - 150;
    
    // Create a color scale for different component groups
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    
    // Create a force simulation
    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));
    
    // Create the SVG container
    const svg = d3.select("#visualization")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .call(d3.zoom().on("zoom", (event) => {
        g.attr("transform", event.transform);
      }));
    
    const g = svg.append("g");
      
    // Add links
    const link = g.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("class", "link")
      .attr("stroke-width", d => Math.sqrt(d.value));
    
    // Add nodes
    const node = g.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .attr("class", "node")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
    
    // Add circles for nodes
    node.append("circle")
      .attr("r", d => 5 + Math.sqrt(d.usedByCount) * 2)
      .attr("fill", d => color(d.group));
    
    // Add labels to nodes
    node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(d => d.name);
    
    // Add tooltip
    const tooltip = d3.select(".tooltip");
    
    node.on("mouseover", (event, d) => {
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.html(\`
        <strong>\${d.name}</strong><br>
        Path: \${d.path}<br>
        Used by: \${d.usedByCount} components
      \`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });
    
    // Update the simulation on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      
      node.attr("transform", d => \`translate(\${d.x}, \${d.y})\`);
    });
    
    // Handle dragging
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    // Controls
    d3.select("#zoom-in").on("click", () => {
      svg.transition().call(
        d3.zoom().on("zoom", (event) => {
          g.attr("transform", event.transform);
        }).scaleBy, 1.3
      );
    });
    
    d3.select("#zoom-out").on("click", () => {
      svg.transition().call(
        d3.zoom().on("zoom", (event) => {
          g.attr("transform", event.transform);
        }).scaleBy, 1 / 1.3
      );
    });
    
    d3.select("#reset").on("click", () => {
      svg.transition().call(
        d3.zoom().on("zoom", (event) => {
          g.attr("transform", event.transform);
        }).transform, d3.zoomIdentity
      );
    });
  </script>
</body>
</html>`;
  
  fs.writeFileSync('component-visualization.html', html);
}

// Determine component group based on path
function getComponentGroup(componentPath) {
  if (componentPath.includes('/ui/')) {
    return 1; // UI components
  } else if (componentPath.includes('/blocks/')) {
    return 2; // Block components
  } else if (componentPath.includes('/charts/')) {
    return 3; // Chart components
  } else if (componentPath.includes('/app/')) {
    return 4; // App components
  } else {
    return 5; // Other components
  }
}

// Main execution
try {
  console.log('Parsing component dependencies...');
  const components = parseComponentDependencies('component-dependencies.md');
  console.log(`Found ${components.size} components`);
  
  console.log('Generating visualization...');
  generateVisualization(components);
  console.log('Visualization generated: component-visualization.html');
} catch (error) {
  console.error('Error generating visualization:', error);
} 