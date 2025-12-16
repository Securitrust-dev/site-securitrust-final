
<high_level_design>
## 1. Brand & Art Direction Overview

The website exhibits a **minimalist, clean, and modern** design aesthetic with a focus on simplicity and functionality. The visual style is characterized by:

- **Ultra-minimal interface** with vast amounts of white/light gray negative space
- **Subtle, sophisticated branding** with minimal visual noise
- **Floating action component** in the bottom-right corner as the primary interactive element
- **Clean typography** with no visible hero sections, headers, or complex layouts in the initial viewport
- **Professional, SaaS-oriented** presentation suggesting a template/tool showcase environment
- **Restrained color palette** focusing on neutrals with dark accent elements
- **High contrast micro-interactions** on the floating badge component

The overall impression is of a **preview/showcase environment** rather than a traditional landing page, emphasizing the template viewing experience over content presentation.

## 2. Color Palette (Light Theme)

| Token | HEX / RGB | Usage | Notes |
|-------|-----------|-------|-------|
| **Background Primary** | `#FFFFFF` / `rgb(255, 255, 255)` | Main page background | Pure white, creates maximum contrast |
| **Background Secondary** | `#F5F5F5` / `rgb(245, 245, 245)` | Subtle background variations | Very light gray |
| **Surface Dark** | `#171717` / `rgb(23, 23, 23)` | Floating badge background (neutral-900) | Deep charcoal, almost black |
| **Border Subtle** | `rgba(255, 255, 255, 0.05)` | Badge border with transparency | White with 5% opacity |
| **Text Primary Dark** | `#D4D4D4` / `rgb(212, 212, 212)` | Text on dark backgrounds (neutral-300) | Light gray for readability |
| **Text Secondary** | `#A3A3A3` / `rgb(163, 163, 163)` | Secondary text, icons (neutral-400) | Medium gray |
| **Text Muted** | `#737373` / `rgb(115, 115, 115)` | Disabled/muted states | Darker gray |
| **Accent Overlay** | `rgba(255, 255, 255, 0.1)` | Hover states on dark elements | White with 10% opacity |
| **Accent Overlay Strong** | `rgba(255, 255, 255, 0.2)` | Active/selected states | White with 20% opacity |
| **Divider** | `rgba(255, 255, 255, 0.1)` | Vertical dividers in badge | Subtle separation |

## 3. Typography Scale (Clone Exactly)

**Primary Font Family**: System font stack (likely `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)

| Element | Size | Weight | Line Height | Letter Spacing | Color |
|---------|------|--------|-------------|----------------|-------|
| **Badge Primary Text** | `11px` | `500` (Medium) | `1.4` | `normal` | `#D4D4D4` (neutral-300) |
| **Badge Secondary Text** | `11px` | `400` (Regular) | `1.4` | `normal` | `#A3A3A3` (neutral-400) |
| **Button Text Small** | `11px` | `500` (Medium) | `1.4` | `normal` | `#A3A3A3` (neutral-400) |
| **Body Text** | `14px` | `400` (Regular) | `1.5` | `normal` | Context-dependent |
| **Icon Text** | `14px` | `400` (Regular) | `1` | `normal` | `#A3A3A3` (neutral-400) |

**Typography Notes**:
- Extremely small text sizes (11px) for compact UI elements
- Consistent use of medium weight (500) for emphasis
- Tight, condensed spacing for micro-interactions
- High contrast between text and dark backgrounds

## 4. Spacing & Layout Grid (Clone Exactly)

**Spacing System**:
- **Base unit**: `4px` (0.25rem)
- **Micro spacing**: `4px` (gap-1)
- **Small spacing**: `8px` (gap-2)
- **Medium spacing**: `12px` (gap-3)
- **Large spacing**: `16px` (gap-4)

**Floating Badge Component Spacing**:
- **Padding**: `8px` horizontal, `4px` vertical (`p-1 px-2`)
- **Height**: `40px` (h-10)
- **Border radius**: `12px` (rounded-xl)
- **Gap between elements**: `0px` initial, `12px` on hover (gap-0 → gap-3)
- **Bottom position**: `16px` (bottom-4)
- **Right position**: `16px` (right-4)

**Layout Structure**:
- **Full viewport**: `min-h-screen` with `h-screen` for iframe container
- **Fullwidth**: `w-full` for all major containers
- **Fixed positioning**: Bottom-right floating badge with `fixed` positioning
- **Z-index**: `50` for floating elements

**Component Internal Spacing**:
- Icon size: `16px` (h-4 w-4) and `20px` (h-5 w-5)
- Avatar size: `16px` (h-4 w-4)
- Lock icon size: `12px` (h-3 w-3) and `14px` (h-3.5 w-3.5)
- Divider height: `16px` (h-4)
- Divider width: `1px` (w-px)

## 5. Visual Effects & Treatments (Clone Exactly)

**Shadows**:
- **Strong shadow** (`shadow-strong`): Applied to floating badge for depth and elevation
- Likely value: `0 10px 40px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)`

**Border Styles**:
- **Subtle border**: `1px solid rgba(255, 255, 255, 0.05)` on dark background
- **Divider**: `1px` width with `rgba(255, 255, 255, 0.1)` color

**Border Radius**:
- **Large**: `12px` (rounded-xl) - Floating badge
- **Medium**: `8px` (rounded-md) - Buttons, hover states
- **Full**: `9999px` (rounded-full) - Avatar

**Transitions & Animations**:

1. **Badge Expansion Animation**:
   - Duration: `500ms`
   - Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (custom elastic ease-out)
   - Properties animated: `opacity`, `max-width`, `transform`, `margin-left`
   - Initial state: `opacity-0`, `max-w-0`, `-translate-x-1`, `pointer-events-none`
   - Hover state: `opacity-100`, `max-w-[1000px]`, `translate-x-0`, `pointer-events-auto`

2. **Divider Animation**:
   - Duration: `500ms`
   - Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
   - Properties: `opacity`, `scale-y`
   - Initial: `opacity-0`, `scale-y-50`
   - Hover: `opacity-100`, `scale-y-100`

3. **Button Hover States**:
   - Duration: `300ms` (standard)
   - Transition: `background-color`, `opacity`
   - Hover background: `rgba(255, 255, 255, 0.1)`

4. **Background Color Transitions**:
   - Duration: `500ms`
   - Easing: `cubic-bezier(0.22, 1, 0.36, 1)`

**Special Effects**:
- **Shine effect**: Custom class applied to badge for subtle gradient overlay
- **Mix-blend mode**: `mix-blend-screen` on logo for visual integration
- **Transform GPU acceleration**: `transform-gpu` for smoother animations
- **Overflow hidden**: On badge container to hide expanding elements

**Image Treatments**:
- **Avatar**: `aspect-square`, `object-cover`, full rounded
- **Logo**: Screen blend mode for integration with dark background

## 6. Component Styles (Clone Exactly)

### **Floating Badge Component** (Primary Interactive Element)

**Container**:
```css
position: fixed;
bottom: 16px;
right: 16px;
z-index: 50;
```

**Badge Inner**:
```css
background: #171717; /* neutral-900 */
border: 1px solid rgba(255, 255, 255, 0.05);
border-radius: 12px;
padding: 4px 8px;
height: 40px;
display: flex;
align-items: center;
gap: 0; /* expands to 12px on hover */
box-shadow: [strong shadow];
overflow: hidden;
transition: background-color 500ms cubic-bezier(0.22, 1, 0.36, 1);
```

**Logo Link**:
```css
display: flex;
align-items: center;
gap: 4px;
transition: opacity 300ms;
```
- Hover: `opacity: 0.8`

**Logo Image**:
```css
height: 20px;
width: 20px;
mix-blend-mode: screen;
```

**Logo Text**:
```css
font-size: 11px;
font-weight: 500;
color: #D4D4D4; /* neutral-300 */
margin-right: 8px;
```

**Expandable Section** (Hidden by default, reveals on hover):
```css
display: flex;
align-items: center;
gap: 12px;
overflow: hidden;
transform: translateX(-4px);
transition: all 500ms cubic-bezier(0.22, 1, 0.36, 1);
opacity: 0;
pointer-events: none;
margin-left: 0;
max-width: 0;
```

**Hover state**:
```css
opacity: 1;
pointer-events: auto;
margin-left: 12px;
max-width: 1000px;
transform: translateX(0);
```

### **Icon Buttons** (Avatar, Share)

```css
display: flex;
align-items: center;
justify-content: center;
padding: 0;
height: 24px;
width: 24px;
border-radius: 8px;
background: transparent;
transition: background-color 300ms;
```

**Hover**:
```css
background: rgba(255, 255, 255, 0.1);
```

**Icons**:
```css
height: 16px;
width: 16px;
color: #A3A3A3; /* neutral-400 */
```

### **Avatar Component**

```css
height: 16px;
width: 16px;
border-radius: 50%;
background: #404040; /* neutral-700 */
overflow: hidden;
```

**Image**:
```css
aspect-ratio: 1;
height: 100%;
width: 100%;
object-fit: cover;
```

### **Disabled Button** (Remix, Code)

```css
padding: 0 8px;
height: 24px;
border-radius: 8px;
font-size: 11px;
color: #A3A3A3; /* neutral-400 */
opacity: 0.5;
cursor: not-allowed;
display: flex;
align-items: center;
```

**Lock Icon**:
```css
height: 12px;
width: 12px;
margin-right: 4px;
```

### **Active Button** (Preview)

```css
padding: 0 8px;
height: 24px;
border-radius: 8px;
font-size: 11px;
background: rgba(255, 255, 255, 0.2);
color: #A3A3A3; /* neutral-400 */
transition: background-color 300ms;
```

### **Divider**

```css
height: 16px;
width: 1px;
background: rgba(255, 255, 255, 0.1);
```

**Animated Divider** (before expandable section):
```css
height: 16px;
width: 1px;
background: rgba(255, 255, 255, 0.1);
opacity: 0;
transform: scaleY(0.5);
transition: all 500ms cubic-bezier(0.22, 1, 0.36, 1);
```

**Hover**:
```css
opacity: 1;
transform: scaleY(1);
```

### **Tab Components** (Hidden)

**Tab List Container**:
```css
height: 40px;
align-items: center;
justify-content: center;
border-radius: 6px;
background: [muted background];
padding: 4px;
display: none; /* hidden */
```

**Tab Button**:
```css
display: inline-flex;
align-items: center;
justify-content: center;
white-space: nowrap;
border-radius: 4px;
padding: 6px 12px;
font-size: 14px;
font-weight: 500;
transition: all 300ms;
```

**Active Tab**:
```css
background: white;
color: [foreground];
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
```

### **Iframe Container**

```css
width: 100%;
height: 100vh;
border: 0;
```

## 7. Site Sections (Clone Exactly)

The website structure is minimal and consists of:

1. **Root Container** (`#root`)
   - Full viewport height
   - Light background
   - Relative positioning

2. **Main Container**
   - `min-h-screen` with light background
   - Relative positioning
   - Contains all content

3. **Preview Container**
   - Full height (`h-screen`)
   - Full width (`w-full`)
   - Relative positioning

4. **Tab System** (Hidden by default)
   - Horizontal orientation
   - Preview and Code tabs
   - Hidden from view (`display: none`)

5. **Iframe Preview Area**
   - Full viewport height
   - Full width
   - No border
   - Contains the actual template preview

6. **Floating Badge Component** (Bottom-right)
   - Fixed positioning
   - Contains "Made in Aura" branding
   - Expandable on hover with:
     - Avatar
     - Share button
     - Remix button (disabled)
     - Preview/Code toggle
   - Primary interactive element

7. **Notifications Region** (Top-center)
   - Fixed positioning
   - Top offset
   - Centered horizontally
   - Maximum height constraints
   - Reverse column flex (notifications stack from bottom)

**Section Order**:
1. Main wrapper
2. Preview/tab container
3. Iframe content area
4. Floating badge (overlay)
5. Notifications region (overlay)

**Notes**:
- The website is essentially a **preview environment/wrapper** around an iframe
- Primary content is loaded within the iframe
- Main interaction is through the floating badge
- Minimal chrome and UI elements
- Focus on showcasing template content
</high_level_design>

<theme>
light
</theme>

<sections>
<clone_section>
    <file_path>src/components/sections/hero-section.tsx</file_path>
    <design_instructions>
Create a full-screen hero section with a clean, minimal design featuring a light gray/white background (#f8f9fa or similar). The section should occupy 100vh height with centered content layout. Include a fixed bottom-right floating badge component that contains the Aura branding with expandable hover interactions. The badge should have a dark neutral background (#171717 or #1a1a1a), rounded corners (12-16px border-radius), subtle border (1px solid rgba(255,255,255,0.05)), and contain the Aura logo SVG with "Made in Aura" text in a neutral-300 color (#d4d4d4). On hover, the badge should expand to reveal additional controls including user avatar, share button, remix button (disabled state), and preview/code toggle buttons with smooth cubic-bezier(0.22,1,0.36,1) transitions. Implement a shine effect overlay and strong shadow (0 8px 32px rgba(0,0,0,0.3)). The main content area should be prepared to host Three.js animations and video content with proper z-index layering (badge at z-50, content area at z-10-30). Use flexbox for layout with gap spacing of 12-16px between interactive elements. All interactive elements should have hover states with 10% white overlay (rgba(255,255,255,0.1)) and scale transforms. The expandable section should use max-width transitions from 0 to 1000px with opacity and transform animations. Include vertical dividers between button groups using 1px width with white/10 opacity. Ensure responsive behavior with hidden elements on mobile (hidden sm:flex classes) and proper touch target sizes.
    </design_instructions>
    <assets>["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/8aebdc26-3d06-42e3-bb7c-f1c035c7f99b-aura-build/assets/svgs/logo-aura-gray-1.svg", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/8aebdc26-3d06-42e3-bb7c-f1c035c7f99b-aura-build/assets/images/images_1.png"]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/three-background.tsx</file_path>
    <design_instructions>
Create a Three.js animated background component that serves as the main visual element for the SecuriTrust landing page. The component should render a full-screen WebGL canvas with a dark, sophisticated theme suitable for a cybersecurity/AI platform. Implement particle systems, geometric shapes, or network-style connections that animate smoothly using requestAnimationFrame. The animation should be subtle yet engaging, with elements that respond to mouse movement (parallax effect) and have continuous ambient motion. Use a color palette that complements the dark theme with accent colors for interactive elements. The component should be performance-optimized with proper cleanup on unmount, handle window resizing gracefully, and maintain 60fps. Layer this component behind the main content (z-index: 0-10) with proper positioning (fixed or absolute) to cover the viewport. Include smooth fade-in animations on mount and implement RAF-based animations with delta time calculations for consistent speed across devices. Consider adding subtle bloom effects, depth of field, or post-processing for enhanced visual appeal while maintaining performance.
    </design_instructions>
    <assets>[]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/video-background.tsx</file_path>
    <design_instructions>
Create a responsive video background component that displays injected video content with proper controls and overlay options. The component should accept video sources via props and render a full-width HTML5 video element with autoplay, loop, and muted attributes for background playback. Implement a dark overlay gradient (linear-gradient from transparent to rgba(0,0,0,0.6)) to ensure text readability when placed over the video. Include optional controls for play/pause, volume, and fullscreen that appear on hover with smooth fade transitions. The video should maintain aspect ratio using object-fit: cover to fill the container without distortion. Add loading states with skeleton placeholders or blur-up effects during video buffering. Ensure the component works seamlessly with the Three.js background by implementing proper layering (z-index management) and blend modes if needed. Support both background video mode (no controls, continuous loop) and featured video mode (with visible controls). Include fallback poster images for when video fails to load and optimize loading with lazy loading attributes. The component should be accessible with proper ARIA labels and keyboard controls, and handle mobile devices appropriately (consider disabling autoplay on mobile to save bandwidth).
    </design_instructions>
    <assets>[]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/floating-badge.tsx</file_path>
    <design_instructions>
Create an isolated, reusable floating badge component positioned fixed at bottom-right (bottom: 1rem, right: 1rem) with z-index of 50. The badge should have a sophisticated dark design with background color #171717, border of 1px solid rgba(255,255,255,0.05), border-radius of 12px, and padding of 4px 8px vertically. Implement a group hover system where the badge expands horizontally to reveal additional controls. The base state shows only the Aura logo (20px height) and "Made in Aura" text (11px font-size, 500 font-weight, #d4d4d4 color). On group hover, animate the expansion using transform-gpu, opacity, max-width, and translate-x transitions with cubic-bezier(0.22,1,0.36,1) easing over 500ms. The expanded state reveals: a vertical divider (1px, white/10), user avatar (16px circular), share button (lucide-share icon, 16px), disabled remix button (with lock icon), another divider, and preview/code toggle buttons. All interactive elements should have 24px height, 24px width for icon buttons, rounded-md corners, and hover states with rgba(255,255,255,0.1) background. Disabled elements should have 50% opacity and cursor-not-allowed. The shine effect should be implemented as a pseudo-element overlay with gradient animation. Include proper gap spacing of 12px between elements. Ensure smooth GPU-accelerated animations and proper pointer-events handling for the collapsed/expanded states.
    </design_instructions>
    <assets>["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/8aebdc26-3d06-42e3-bb7c-f1c035c7f99b-aura-build/assets/svgs/logo-aura-gray-1.svg", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/8aebdc26-3d06-42e3-bb7c-f1c035c7f99b-aura-build/assets/images/images_1.png"]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/main-content-section.tsx</file_path>
    <design_instructions>
Create the main content container section that sits above the Three.js and video backgrounds with proper z-index layering (z-20-30). This section should have a flexbox column layout with centered alignment and handle the primary content presentation for SecuriTrust. Implement a maximum width container (1200px) with responsive horizontal padding (32px desktop, 24px tablet, 16px mobile). The section should support inserting hero headlines, feature descriptions, call-to-action buttons, and interactive demo components. Use a transparent or semi-transparent background to allow the animated backgrounds to show through while maintaining content readability. Include proper vertical spacing between content blocks (64px desktop, 48px tablet, 32px mobile). The layout should be fully responsive with mobile-first approach, stacking elements vertically on smaller screens. Add smooth scroll animations for content elements using Intersection Observer API with fade-in and slide-up effects as elements enter the viewport. Ensure all text maintains high contrast ratios for accessibility (WCAG AA minimum) against the animated backgrounds. Include support for glass morphism effects on cards/panels with backdrop-filter: blur(10px) and subtle borders. The component should handle dynamic content injection and maintain proper spacing and alignment regardless of content length.
    </design_instructions>
    <assets>[]</assets>
  </clone_section>
</sections>
