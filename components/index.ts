/**
 * Main Components Barrel Export
 * 
 * Central export point for all modular components
 */

// Challenge System
export * from "./challenge";

// Form Components
export * from "./forms";

// Admin Components
export * from "./admin/payments";

// Common UI Components
export * from "./ui/common";

// Re-export commonly used UI components
export { Button } from "./ui/button";
export { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
export { Pagination } from "./ui/pagination";