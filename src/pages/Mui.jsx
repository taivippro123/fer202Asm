// 1. Text Styles
// These properties control font, color, alignment, and text transformations.

// Font Properties

// fontSize: e.g., "1rem", "2rem", or any unit (px, em, rem).
// fontWeight: e.g., "bold", 400, 600, 700.
// fontStyle: e.g., "italic", "normal".
// textTransform: e.g., "uppercase", "lowercase", "capitalize".
// letterSpacing: e.g., "0.05em", "2px".
// lineHeight: e.g., 1.5, "2rem".
// Text Decoration & Color

// textDecoration: e.g., "none", "underline", "line-through".
// color: e.g., "grey.500", "primary.main", "secondary.light".
// Text Alignment

// textAlign: e.g., "left", "center", "right", "justify".
// wordBreak: e.g., "break-word", "keep-all".
// whiteSpace: e.g., "nowrap", "pre-wrap" (prevents or allows line breaks).
// 2. Layout and Display
// Control component layout, including flexbox properties for alignment.

// Display Properties

// display: e.g., "block", "inline", "flex", "grid", "inline-block".
// visibility: e.g., "visible", "hidden".
// Flexbox Layout

// flexDirection: e.g., "row", "column", "row-reverse".
// justifyContent: e.g., "flex-start", "center", "space-between".
// alignItems: e.g., "stretch", "center", "flex-end".
// flexWrap: e.g., "nowrap", "wrap", "wrap-reverse".
// flexGrow, flexShrink: Numbers, e.g., 1, 0.
// flexBasis: e.g., "auto", "50%", "200px".
// alignSelf: Overrides alignItems on a single item, e.g., "center", "flex-start".
// Grid Layout

// gridTemplateColumns: e.g., "repeat(3, 1fr)", "200px 1fr".
// gridTemplateRows: e.g., "auto 1fr", "repeat(2, 100px)".
// gap: e.g., "16px", 2 (spacing).
// gridAutoFlow: e.g., "row", "column".
// 3. Sizing and Overflow
// Define the size and control overflow within the component.

// width, height: e.g., "100%", "auto", "50px".
// maxWidth, minWidth: e.g., "250px", "100%".
// maxHeight, minHeight: e.g., "200px", "100vh".
// overflow: e.g., "hidden", "scroll", "auto".
// overflowX, overflowY: Specific control for horizontal and vertical overflow.
// 4. Color and Variant
// Apply preset colors and styles for components like buttons, text fields, and cards.

// Variants

// variant="text": Text-only (for buttons).
// variant="contained": Solid background.
// variant="outlined": Outlined border.
// Color

// color="primary": Primary color.
// color="secondary": Secondary color.
// color="error": Error color (typically red).
// color="success": Success color (typically green).
// backgroundColor: Custom background color, e.g., "primary.main", "secondary.light".
// 5. Spacing and Positioning
// Control margin, padding, and position.

// Spacing Shorthand (Material-UI spacing unit is 8px by default)

// m, mt, mr, mb, ml, mx, my: Margin, with directions (top, right, bottom, left, x-axis, y-axis).
// p, pt, pr, pb, pl, px, py: Padding, with directions.
// Examples: mt: 2, mx: "auto", p: 1 (where 2 translates to 16px and 1 to 8px).
// Positioning

// position: e.g., "relative", "absolute", "fixed", "sticky".
// top, right, bottom, left: Position offsets, e.g., 0, "10px".
// zIndex: Layer order, e.g., 1000.
// 6. Borders and Shadows
// Add borders, rounded corners, and shadow effects for a polished look.

// Borders

// border: e.g., "1px solid grey".
// borderColor: e.g., "grey.300", "primary.main".
// borderRadius: e.g., "8px", 2 (predefined rounded corners).
// borderWidth, borderStyle: e.g., "2px", "dashed", "solid".
// Box Shadows

// boxShadow: e.g., 1, 2, or custom values like "0px 4px 12px rgba(0, 0, 0, 0.1)".
// 7. Hover, Focus, and Active States
// Interactive states for hover, focus, active, and disabled.

// &:hover: Styles for hover, e.g., &:hover { backgroundColor: 'secondary.main' }.
// &:focus: Styles for focus.
// &:active: Styles for active state.
// disabled: e.g., disabled={true} (disables the component).
// opacity: e.g., 0.5 (useful for disabled effects).
// 8. Typography-Specific Styles
// Material-UI also includes typography-specific variants and properties for headings, subtitles, body text, etc.

// Variants

// variant="h1" to variant="h6": Heading sizes.
// variant="body1" or variant="body2": Standard body text.
// variant="subtitle1" or variant="subtitle2": Smaller subtitle text.
// variant="caption": Small, caption text.
// variant="button": Text styled for buttons.
// Additional Text Styles

// paragraph: Renders text as a paragraph.
// gutterBottom: Adds bottom margin.