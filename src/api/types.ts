/**
 Schema Generated with mysql-schema-ts 1.9.0
*/

export type JSONPrimitive = string | number | boolean | null
export type JSONValue = JSONPrimitive | JSONObject | JSONArray
export type JSONObject = { [member: string]: JSONValue }
export type JSONArray = Array<JSONValue>

/**
 * Exposes all fields present in attributions as a typescript
 * interface.
 */
export interface Attributions {
  id: number
  type: 'content' | 'relations'
  link_material: number
  link_citation: number
}

/**
 * Exposes the same fields as Attributions,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface AttributionsWithDefaults {
  id?: number
  type: 'content' | 'relations'
  link_material: number
  link_citation: number
}
/**
 * Exposes all fields present in citations as a typescript
 * interface.
 */
export interface Citations {
  id: number
  name: string
  collection: string
  content: JSONValue
}

/**
 * Exposes the same fields as Citations,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface CitationsWithDefaults {
  id?: number
  name: string
  collection: string
  content: JSONValue
}
/**
 * Exposes all fields present in content as a typescript
 * interface.
 */
export interface Content {
  id: number
  type: 'person' | 'school' | 'institution'
  name: string
  content: JSONValue
}

/**
 * Exposes the same fields as Content,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface ContentWithDefaults {
  id?: number
  type: 'person' | 'school' | 'institution'
  name: string
  content: JSONValue
}
/**
 * Exposes all fields present in relations as a typescript
 * interface.
 */
export interface Relations {
  id: number
  type: 'mentored' | 'studied at' | 'worked at' | 'worked alongside' | 'served on'
  subtype: string
  link_from: number
  link_to: number
  year_start: number
  year_end?: number | null
  content: JSONValue
}

/**
 * Exposes the same fields as Relations,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface RelationsWithDefaults {
  id?: number
  type: 'mentored' | 'studied at' | 'worked at' | 'worked alongside' | 'served on'
  subtype: string
  link_from: number
  link_to: number
  year_start: number
  year_end?: number | null
  content: JSONValue
}
/**
 * Exposes all fields present in revisions as a typescript
 * interface.
 */
export interface Revisions {
  id: number
  type: 'content' | 'relations' | 'citations'
  link_modifies: number
  created: Date
  content: JSONValue
}

/**
 * Exposes the same fields as Revisions,
 * but makes every field containing a DEFAULT value optional.
 *
 * This is especially useful when generating inserts, as you
 * should be able to omit these fields if you'd like
 */
export interface RevisionsWithDefaults {
  id?: number
  type: 'content' | 'relations' | 'citations'
  link_modifies: number
  created: Date
  content: JSONValue
}
