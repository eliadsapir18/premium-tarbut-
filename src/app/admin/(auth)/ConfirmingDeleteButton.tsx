"use client";

interface Props {
  title: string;
}

export default function ConfirmingDeleteButton({ title }: Props) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(`למחוק את "${title}"? פעולה זו לא ניתנת לביטול.`)) {
          e.preventDefault();
        }
      }}
      className="rounded-lg border border-red-400/30 px-3 py-1.5 text-xs text-red-300 hover:border-red-400 hover:text-red-200"
    >
      מחיקה
    </button>
  );
}
