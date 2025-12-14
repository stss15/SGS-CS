# Public Directory

This directory contains both generated and standalone files.

## ⚠️ Important: Know Which Files to Edit

### Generated Files (from Nunjucks templates)

These files are built from `src/pages/*.njk`. **DO NOT edit directly.**

Run `npm run build` to regenerate these after editing the `.njk` source.

Check `meta/site-manifest.json` for the complete list of generated pages.

Generated files include a leading marker comment:

```html
<!-- GENERATED FILE - Edit source in src/pages/ instead -->
```

### Standalone Files (edit directly)

These files have no template source. Edit them directly:

- `ib/B2/B2.2.4 Recursion Visualisor.html`
- `ib/B2/Big_0_notation.html`
- `ib/B4/LL_Visualisation.html`
- `ib/B4/BST_Visualisation.html`
- `ib/B4/B4.1.2_linked_lists.html`
- `ks3/year7/unit2/Online-behaviour.html`
- `ks3/year7/unit2/digital-footprint-app.html`
- `ks3/year7/unit2/student_activities.html`
- `igcse/topic1/binary-addition-game.html`
- `igcse/topic1/binary_game.html`

### Separate Project

The React app in `ib/Learn Python Map/` is a separate project. See its own README for build instructions.

