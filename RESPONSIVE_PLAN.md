# Professional Responsive Design Plan (Keep Colors/Design)

**Current Status**: Partial responsive (56 @media hits). Gaps: Container padding, full grid responsiveness, touch targets, nav mobile menu.

**Information Gathered**:

- Breakpoints: 360/480/768/1024px good coverage.
- Strong: Food-grid (4→2→1 col), Cards, Hero, Navbar padding clamp().
- Gaps: No hamburger nav mobile, CategoryFilter, container `.container` missing def, checkout layouts, Footer.

**Plan**:

1. **Define .container**: max-width breakpoints, padding.
2. **Navbar**: Add hamburger mobile menu (hide links, toggle drawer).
3. **Page sections**: `.section` spacing responsive.
4. **CategoryFilter**: Stack mobile.
5. **FoodCard**: Touch-optimized buttons, disable hover mobile.
6. **Modals/Cart**: Fullscreen mobile.
7. **Checkout**: Single column mobile.
8. **Footer**: Stack columns.
9. **Global**: Touch targets min 44px, font-scale vw.

**Files**:
| Priority | File | Changes |
|----------|------|---------|
| High | globals.css/page.module.css | .container, .section responsive |
| High | Navbar/navbar.css/JSX | Mobile hamburger |
| Med | CategoryFilter/category.css | Stack filters |
| Med | Footer/footer.css | Stack |
| Low | All modals | Fullscreen mobile |

**Followup**: `npm run dev` test iPhone/Android/Tablet.

Confirm plan & start with globals.css containers?
