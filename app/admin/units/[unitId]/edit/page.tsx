"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UnitForm } from "../../components/unit-form";

interface Unit {
  id: number;
  title: string;
  description: string;
  courseId: number;
  order: number;
}

export default function EditUnitPage({ params }: { params: { unitId: string } }) {
  const [unit, setUnit] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const response = await fetch(`/api/units/${params.unitId}`);
        if (response.ok) {
          const data = await response.json();
          setUnit(data);
        } else {
          console.error('Failed to fetch unit');
          router.push('/admin/units');
        }
      } catch (error) {
        console.error('Error fetching unit:', error);
        router.push('/admin/units');
      } finally {
        setLoading(false);
      }
    };

    fetchUnit();
  }, [params.unitId, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!unit) {
    return null; // Will redirect in useEffect
  }

  return (
    <UnitForm 
      mode="edit" 
      unitId={parseInt(params.unitId)}
      initialData={{
        title: unit.title,
        description: unit.description,
        courseId: unit.courseId,
        order: unit.order,
      }}
    />
  );
}