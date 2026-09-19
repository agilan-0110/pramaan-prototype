/**
 * SETU Design Tokens
 * 
 * Aesthetic & Design Philosophy:
 * - Institutional government audit dashboard (MoSPI / CAG / District Authority).
 * - Restrained, information-dense, high-contrast, functional over decorative.
 * - Anti-patterns strictly enforced:
 *   - NO gradients
 *   - NO glassmorphism or blur effects
 *   - NO heavy drop-shadows (use thin borders for component separation)
 *   - NO oversized rounded corners (max 8px)
 *   - NO purple/violet tones
 *   - Accent color strictly reserved for alerts, warnings, and risk/status flags.
 */

export const colors = {
  // Primary: Institutional Navy / Dark Blue
  primary: {
    base: '#0B2545',       // Core institutional navy
    dark: '#06182C',       // Deep navy for high-contrast headers & active items
    light: '#133D72',      // Hover / interaction navy
    surface: '#EDF4F9',    // Very faint tinted background for selected table rows
    text: '#FFFFFF',       // Text on primary buttons and dark headers
  },

  // Backgrounds: Clean, high-contrast, non-decorative
  background: {
    base: '#FFFFFF',       // Clean primary white canvas
    subtle: '#F8F9FA',     // Table headers, card headers, alternating table rows
    muted: '#F1F3F5',      // Sidebar, container fills, disabled inputs
  },

  // Neutral Grays: Text, borders, gridlines, dividers
  neutral: {
    50: '#F8F9FA',         // Off-white surface
    100: '#F1F3F5',        // Lightest divider / row zebra
    200: '#E2E8F0',        // Standard audit gridline / table border
    300: '#CBD5E1',        // Stronger border for card containers / form controls
    400: '#94A3B8',        // Disabled controls / subtle placeholders
    500: '#64748B',        // Muted captions / column descriptors
    600: '#475569',        // Secondary text / metadata labels
    700: '#334155',        // High-readability secondary content
    800: '#1E293B',        // Standard dark text
    900: '#0F172A',        // Primary text (near black, crisp contrast)
  },

  // Text Hierarchy
  text: {
    primary: '#0F172A',    // High-contrast primary copy & numbers
    secondary: '#475569',  // Field labels, metadata, timestamps
    muted: '#64748B',      // Explanatory notes, table captions
    disabled: '#94A3B8',   // Inactive controls
    inverse: '#FFFFFF',    // Text on dark navy backgrounds
  },

  // Borders & Dividers
  border: {
    default: '#E2E8F0',    // Standard component border (1px solid)
    subtle: '#F1F3F5',     // Light inner row dividers
    strong: '#CBD5E1',     // Table headers, input borders, focused boundaries
    dark: '#0B2545',       // Primary accent boundaries / selected state
  },

  // Single Accent Color: Strictly for alerts, warnings, contradictions, and risk scores
  // DO NOT USE DECORATIVELY IN BUTTONS, HERO HEADERS, OR ACCENT STRIPES.
  accent: {
    base: '#C53030',       // Flag / alert crimson red (WCAG AAA compliant on white)
    dark: '#9B2C2C',       // High-risk critical flag text
    light: '#FFF5F5',      // Alert box background fill
    border: '#FEB2B2',     // Alert box border
    text: '#9B2C2C',       // Text inside alert banners
  },
};

export const typography = {
  // Font Stacks: System UI / Noto Sans style institutional typography + JetBrains/tabular mono
  fontFamily: {
    sans: '"Noto Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"JetBrains Mono", "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", monospace',
  },

  // 5 strict size steps: heading, subheading, body, small, caption
  fontSize: {
    heading: '1.25rem',     // 20px - Section titles & primary audit card titles
    subheading: '1.0rem',   // 16px - Table headers, modal titles, subsection headers
    body: '0.875rem',       // 14px - Primary dense audit text, form inputs, table data
    small: '0.75rem',       // 12px - Metadata, badges, table sub-lines, timestamps
    caption: '0.6875rem',   // 11px - Disclaimer text, micro tags, status indicators
  },

  lineHeight: {
    heading: '1.3',
    subheading: '1.4',
    body: '1.5',
    small: '1.4',
    caption: '1.3',
  },

  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  letterSpacing: {
    tight: '-0.01em',
    normal: '0',
    wide: '0.02em',
  },
};

// Consistent 4px / 8px base unit scale for dense audit layouts
export const spacing = {
  0: '0px',
  1: '4px',   // 0.25rem
  2: '8px',   // 0.5rem
  3: '12px',  // 0.75rem
  4: '16px',  // 1.0rem
  5: '20px',  // 1.25rem
  6: '24px',  // 1.5rem
  8: '32px',  // 2.0rem
  10: '40px', // 2.5rem
  12: '48px', // 3.0rem
};

// Subtle border radii: 4-8px maximum (oversized rounded corners strictly avoided)
export const borderRadius = {
  none: '0px',
  xs: '2px',   // Tiny badge / tag corners
  sm: '4px',   // Standard button, input field, table cell selection
  md: '6px',   // Cards, panels, modal dialogue boxes
  max: '8px',  // Ceiling for all rounded surfaces in the application
};

// Borders: Clean thin 1px lines used instead of drop-shadows
export const borders = {
  none: 'none',
  width: '1px',
  style: 'solid',
  default: '1px solid #E2E8F0',
  subtle: '1px solid #F1F3F5',
  strong: '1px solid #CBD5E1',
  accent: '1px solid #FEB2B2',
  focus: '2px solid #0B2545',
};

// Heavy shadows are strictly avoided in favor of thin borders.
// Minimal subtle elevations provided only when required for overlay contrast.
export const shadows = {
  none: 'none',
  subtle: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
  dropdown: '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
};

// Layout & Density Constants for Government Audit Data Grids
export const density = {
  tableRowHeightCompact: '32px',
  tableRowHeightDefault: '40px',
  inputHeight: '34px',
  buttonHeight: '34px',
};

const tokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  borders,
  shadows,
  density,
};

export default tokens;
