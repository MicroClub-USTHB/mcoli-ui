# Extracting the Figma spec

## Parse the URL

A Dev Mode URL looks like:

```
https://www.figma.com/design/<fileKey>/<fileName>?node-id=<a>-<b>&m=dev
```

- `fileKey` is the path segment after `/design/` (or `/file/`).
- `nodeId` is `node-id` with `-` replaced by `:`. For example, `12-345` becomes `12:345`.
- For a branch URL (`/design/<fileKey>/branch/<branchKey>/...`), use `branchKey` as the file key.

## Tools

Use the Figma MCP server tools. Their exact prefix depends on how the server is installed, so search for them by name (`get_metadata`, `get_design_context`, `get_variable_defs`, `get_screenshot`). If none are available, or they need authentication, stop and tell the user to connect Figma (claude.ai connector settings or `/mcp`).

## Steps

1. **Structure.** Call `get_metadata` on the node. Identify the component set, every variant, and each sub-component (slots such as icon, label, close button). Note the node ID of each variant.
2. **Screenshots.** Call `get_screenshot` on the component set, and on each variant whose details are too small to read in the set screenshot. Keep them for the visual comparison in step 2 of the workflow.
3. **Variables.** Call `get_variable_defs` on the component set. Record every color, spacing, radius, shadow and typography variable or style name and its value.
4. **Design context.** Call `get_design_context` on each variant (or on the set, if it is small). The generated code is a reference for exact values only. Never copy it into the repo.
5. **Annotations.** Read the Dev Mode annotations, descriptions and any documentation frames next to the component. They often define behaviour, states and usage rules.

If a response is too large, call `get_metadata` again and query smaller child nodes.

## Spec to write

Write the spec before you read the component code:

- **Component properties**: every Figma variant property, boolean property, instance-swap property and text property, with its options and default.
- **Anatomy**: slots and their order, and which slots are optional.
- **Per variant and size**: height, min-width, padding (each side), gap, border width, radius, and for each element: fill, stroke, text color, typography style, icon size, shadow.
- **States**: default, hover, focus-visible, active/pressed, disabled, invalid, open/closed, selected, loading, and any others shown.
- **Variable names**: the Figma variable or style name for each value, not only the hex or px value. Names map to repo tokens (see [design-system.md](design-system.md)).
- **Behaviour**: interactions, animation and motion values (`get_motion_context` if there is motion), and keyboard behaviour if annotated.
- **Gaps**: anything Figma does not define (for example, dark mode or focus ring). Record these and use the closest existing mcoli-ui pattern.
