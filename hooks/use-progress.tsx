import { useEffect, useMemo, useState } from "react";

export type VolcanoId = "arenal" | "poas" | "irazu" | "rincon" | "turrialba";

export type ExerciseId = "phrase" | "audio" | "map" | "quiz" | "journal";

export interface ExerciseProgress {
  phrase: boolean;
  audio: boolean;
  map: boolean;
  quiz: boolean;
  journal: boolean;
}

type VolcanoProgress = Record<VolcanoId, { 
  completed: boolean; 
  points: number;
  exercises: ExerciseProgress;
}>;

const STORAGE_KEY = "volcanoProgress";

const DEFAULT_EXERCISES: ExerciseProgress = {
  phrase: false,
  audio: false,
  map: false,
  quiz: false,
  journal: false,
};

const DEFAULT_PROGRESS: VolcanoProgress = {
  arenal: { completed: false, points: 0, exercises: { ...DEFAULT_EXERCISES } },
  poas: { completed: false, points: 0, exercises: { ...DEFAULT_EXERCISES } },
  irazu: { completed: false, points: 0, exercises: { ...DEFAULT_EXERCISES } },
  rincon: { completed: false, points: 0, exercises: { ...DEFAULT_EXERCISES } },
  turrialba: { completed: false, points: 0, exercises: { ...DEFAULT_EXERCISES } },
};

function loadProgress(): VolcanoProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<VolcanoProgress>;

    // Deep-merge parsed data with defaults to avoid undefined nested fields
    const merged: VolcanoProgress = { ...DEFAULT_PROGRESS };
    (Object.keys(merged) as VolcanoId[]).forEach((id) => {
      const v: any = (parsed as any)?.[id] || {};
      merged[id] = {
        completed: v.completed ?? false,
        points: typeof v.points === "number" ? v.points : 0,
        exercises: { ...DEFAULT_EXERCISES, ...(v.exercises || {}) },
      };
    });

    return merged;
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

function saveProgress(p: VolcanoProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {}
}

export function useVolcanoProgress() {
  const [progress, setProgress] = useState<VolcanoProgress>(() => loadProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const markCompleted = (id: VolcanoId) => {
    setProgress((prev) => ({ ...prev, [id]: { ...prev[id], completed: true } }));
  };

  const addPoints = (id: VolcanoId, delta: number) => {
    setProgress((prev) => ({ ...prev, [id]: { ...prev[id], points: Math.max(0, prev[id].points + delta) } }));
  };

  const completeExercise = (volcanoId: VolcanoId, exerciseId: ExerciseId, points: number) => {
    setProgress((prev) => {
      const updated = { ...prev };
      updated[volcanoId] = {
        ...updated[volcanoId],
        points: updated[volcanoId].points + points,
        exercises: { ...updated[volcanoId].exercises, [exerciseId]: true },
      };
      // Auto-complete volcano if all required exercises done
      const required: ExerciseId[] = ["phrase", "audio", "map"];
      const allRequired = required.every(ex => updated[volcanoId].exercises[ex]);
      if (allRequired) {
        updated[volcanoId].completed = true;
      }
      return updated;
    });
  };

  const isUnlocked = (id: VolcanoId): boolean => {
    const order: VolcanoId[] = ["arenal", "turrialba", "irazu", "poas", "rincon"];
    const idx = order.indexOf(id);
    if (idx === 0) return true;
    return progress[order[idx - 1]].completed;
  };

  const getTitle = (): string => {
    if (totalPoints >= 200) return "Volcano Virtuoso";
    if (totalPoints >= 100) return "Trail Explorer";
    return "Curious Wanderer";
  };

  const reset = () => setProgress({ ...DEFAULT_PROGRESS });

  const totalCompleted = useMemo(
    () => (Object.values(progress).filter((v) => v.completed).length),
    [progress]
  );

  const totalPoints = useMemo(
    () => Object.values(progress).reduce((sum, v) => sum + v.points, 0),
    [progress]
  );

  const percent = useMemo(() => Math.round((totalCompleted / 5) * 100), [totalCompleted]);

  return { 
    progress, 
    totalCompleted, 
    totalPoints, 
    percent, 
    markCompleted, 
    addPoints, 
    completeExercise,
    isUnlocked,
    getTitle,
    reset 
  };
}
