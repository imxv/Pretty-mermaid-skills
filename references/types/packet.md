# Packet Diagram

## Basic Syntax (Absolute Bit Ranges)
```mermaid
packet
  0-15: "Source Port"
  16-31: "Destination Port"
  32-63: "Sequence Number"
  64-95: "Acknowledgment Number"
  96-99: "Data Offset"
  100-105: "Reserved"
  106: "URG"
  107: "ACK"
  108: "PSH"
  109: "RST"
  110: "SYN"
  111: "FIN"
  112-127: "Window"
```

## Simplified Syntax (Relative Bit Counts)
```mermaid
packet
title UDP Packet
+16: "Source Port"
+16: "Destination Port"
+16: "Length"
+16: "Checksum"
+32: "Data (variable length)"
```

## Mixed Syntax
```mermaid
packet
title Custom Protocol
0-7: "Header"
+8: "Version"
+16: "Payload"
32-63: "Footer"
```

## Best Practices
- Use standard byte boundaries (8, 16, 32 bits) where possible
- Use relative bit counts (`+16`) for simpler authoring
- Single bits can be specified individually (e.g., `106: "URG"`)
- Include a title for clarity
