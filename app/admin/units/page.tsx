"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";

interface Unit {
  id: number;
  title: string;
  description: string;
  courseId: number;
  order: number;
  course?: {
    title: string;
  };
}

export default function UnitsPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await fetch('/api/units');
      const data = await response.json();
      setUnits(data);
    } catch (error) {
      console.error('Failed to fetch units:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUnit = async (id: number) => {
    if (!confirm('Are you sure you want to delete this unit?')) {
      return;
    }

    try {
      const response = await fetch(`/api/units/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUnits(units.filter(unit => unit.id !== id));
      } else {
        alert('Failed to delete unit');
      }
    } catch (error) {
      console.error('Error deleting unit:', error);
      alert('Failed to delete unit');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Units</h1>
          <p className="text-gray-600">Manage course units and chapters</p>
        </div>
        <Link href="/admin/units/new">
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Unit
          </Button>
        </Link>
      </div>

      {/* Units List */}
      {units.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">No units yet</h3>
            <p className="mb-4">Create your first unit to organize course content.</p>
            <Link href="/admin/units/new">
              <Button variant="primary">Add Unit</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {units.map((unit) => (
            <Card key={unit.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Order {unit.order}
                    </span>
                    {unit.course && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {unit.course.title}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {unit.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {unit.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link href={`/admin/units/${unit.id}/edit`}>
                    <Button variant="secondaryOutline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="dangerOutline"
                    size="sm"
                    onClick={() => deleteUnit(unit.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}