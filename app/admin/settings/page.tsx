"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Database, Users, Shield, Download, Upload } from "lucide-react";

export default function SettingsPage() {
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  
  const handleExport = async (format: 'json' | 'csv' = 'json') => {
    setExporting(true);
    try {
      const response = await fetch(`/api/admin/export?format=${format}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `aws-learning-platform-export-${new Date().toISOString().split('T')[0]}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert('Export failed');
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed');
    } finally {
      setExporting(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const text = await file.text();
      const importData = JSON.parse(text);
      
      const response = await fetch('/api/admin/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(importData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Import successful! ${result.results.coursesImported} courses imported.`);
        window.location.reload();
      } else {
        const error = await response.text();
        alert(`Import failed: ${error}`);
      }
    } catch (error) {
      console.error('Import error:', error);
      alert('Import failed: Invalid file format');
    } finally {
      setImporting(false);
      // Reset file input
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage system settings and configuration</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Database className="w-6 h-6 text-blue-600" />
              <CardTitle>Data Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Export and import course data
            </p>
            <div className="space-y-2">
              <div className="space-y-2">
                <Button 
                  variant="primaryOutline" 
                  className="w-full justify-start"
                  onClick={() => handleExport('json')}
                  disabled={exporting}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {exporting ? 'Exporting...' : 'Export as JSON'}
                </Button>
                <Button 
                  variant="secondaryOutline" 
                  className="w-full justify-start"
                  onClick={() => handleExport('csv')}
                  disabled={exporting}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {exporting ? 'Exporting...' : 'Export as CSV'}
                </Button>
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={importing}
                />
                <Button 
                  variant="secondaryOutline" 
                  className="w-full justify-start"
                  disabled={importing}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {importing ? 'Importing...' : 'Import Data'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-green-600" />
              <CardTitle>User Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Manage user accounts and permissions
            </p>
            <div className="space-y-2">
              <Button variant="primaryOutline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                View All Users
              </Button>
              <Button variant="secondaryOutline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Admin Permissions
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Settings className="w-6 h-6 text-orange-600" />
              <CardTitle>System</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              System configuration and maintenance
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm">
                <span className="font-medium">Status:</span>
                <span className="ml-2 text-green-600">Online</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Uptime:</span>
                <span className="ml-2">99.9%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-red-600" />
              <CardTitle>Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Security settings and monitoring
            </p>
            <div className="space-y-2">
              <Button variant="dangerOutline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Security Logs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}