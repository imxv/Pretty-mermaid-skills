# Requirement Diagram

> **Note:** Requirement diagrams are based on SysML requirements modeling.

## Basic Syntax
```mermaid
requirementDiagram

requirement req_1 {
  id: "REQ-001"
  text: "System must authenticate users securely."
  risk: "high"
  verifymethod: "test"
}

element security_module {
  type: "module"
}

security_module - satisfies -> req_1
```

## Requirement Types
- `requirement`
- `functionalRequirement`
- `performanceRequirement`
- `interfaceRequirement`
- `physicalRequirement`
- `designConstraint`

## Attributes
- `id:` - Unique identifier (string or number)
- `text:` - The actual requirement text
- `risk:` - `low`, `medium`, or `high`
- `verifymethod:` - `analysis`, `demonstration`, `inspection`, or `test`

## Elements
Elements represent the system components or tests that fulfill or verify requirements.

```mermaid
element auth_service {
  type: "microservice"
  docRef: "auth-docs.md"
}
```

## Relationships
- `- satisfies ->`
- `- verifies ->`
- `- traces ->`
- `- contains ->`
- `- derives ->`
- `- refines ->`
- `<- copies -`

## Best Practices
- Use specific, measurable text for requirements
- Group elements that satisfy the same requirement
- Assign appropriate risk levels and verification methods based on criticality
