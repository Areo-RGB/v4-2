# Component Dependency Summary

## Most Used Components

1. **card** (registry/new-york-v4/ui/card.tsx) - Used by 92 components
2. **sidebar** (registry/new-york-v4/ui/sidebar.tsx) - Used by 88 components
3. **chart** (registry/new-york-v4/ui/chart.tsx) - Used by 77 components

These core UI components form the foundation of the application interface and are extensively used throughout the codebase.

## Key Component Usage Patterns

### UI Component Distribution
- Most reusable UI components are located in `registry/new-york-v4/ui/`
- Chart components are concentrated in `registry/new-york-v4/charts/`
- Block-specific components are organized in `registry/new-york-v4/blocks/*/components/`

### Component Hierarchies
- Dashboard layout components import sidebar and navigation components
- Chart components rely heavily on the base chart component
- Most UI components are composed from simpler primitive components

## Component Dependency Structure

The application follows a hierarchical component structure:

1. **Core UI primitives** (buttons, cards, inputs) 
   - Located in registry/new-york-v4/ui/
   - Highly reused across the application

2. **Specialized components** (charts, sidebars, navigation)
   - Build upon UI primitives
   - Used by page components and blocks

3. **Block components** 
   - Located in registry/new-york-v4/blocks/*/components/
   - Combine multiple specialized components
   - Used in specific page layouts

4. **Page components**
   - Located in app/ directory structure
   - Import and arrange block components

This layered architecture promotes component reuse and maintainability.

For complete dependency details, see the full component-dependencies.md file. 