/**
 * Utilities for generating TypeScript types from tool input schemas
 */
import { Tool } from "@modelcontextprotocol/sdk/types.js";
/**
 * JSON Schema property definition
 */
export interface JSONSchemaProperty {
    type: string;
    description?: string;
    enum?: string[];
    minimum?: number;
    maximum?: number;
    pattern?: string;
    items?: JSONSchemaProperty;
    properties?: Record<string, JSONSchemaProperty>;
    required?: string[];
}
/**
 * JSON Schema definition
 */
export interface JSONSchema {
    type: string;
    properties?: Record<string, JSONSchemaProperty>;
    required?: string[];
    additionalProperties?: boolean;
}
/**
 * Converts a JSON Schema property type to TypeScript type
 */
export declare function jsonSchemaTypeToTsType(property: JSONSchemaProperty): string;
/**
 * Generates a TypeScript interface from a JSON Schema
 */
export declare function generateInterfaceFromSchema(name: string, schema: JSONSchema): string;
/**
 * Converts a tool name to a PascalCase interface name
 */
export declare function toolNameToInterfaceName(toolName: string): string;
/**
 * Generates TypeScript types for tool input parameters
 */
export declare function generateToolInputTypes(tools: Tool[]): string;
/**
 * Validates that an object matches a JSON Schema
 */
export declare function validateAgainstSchema(data: unknown, schema: JSONSchema, fieldName?: string): void;
/**
 * Creates a type-safe parameter validator for a specific tool
 */
export declare function createToolValidator(tool: Tool): (params: unknown) => void;
//# sourceMappingURL=schema-types.d.ts.map