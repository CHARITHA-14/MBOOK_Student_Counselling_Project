import { useEffect, useState, useCallback } from 'react';
import { getCurrentUser } from '../../utils/auth';
import Card from '../../components/Card';
import { MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function MentorRemarks() {
  const user = getCurrentUser();
  type RemarkItem = {
    id: string;
    date?: string;
    created_at?: string;
    remark?: string;
    content?: string;
  };
  const [remarks, setRemarks] = useState<RemarkItem[]>([]);

  const fetchRemarks = useCallback(async () => {
    if (!supabase || !user?.id) {
      const local = JSON.parse(localStorage.getItem(`updates:mentor_remarks:${user?.id}`) || '[]') as RemarkItem[];
      const initial = (user?.mentorRemarks || []) as RemarkItem[];
      const combined = [...local, ...initial].sort(
        (a, b) =>
          new Date(b.created_at || b.date || '').getTime() - new Date(a.created_at || a.date || '').getTime()
      );
      setRemarks(combined);
      return;
    }
    const { data } = await supabase
      .from('mentor_remarks')
      .select('*')
      .eq('student_id', user.id)
      .order('created_at', { ascending: false });
    const local = JSON.parse(localStorage.getItem(`updates:mentor_remarks:${user.id}`) || '[]') as RemarkItem[];
    const combined = [...(data || []), ...local].sort(
      (a, b) =>
        new Date(b.created_at || b.date || '').getTime() - new Date(a.created_at || a.date || '').getTime()
    );
    setRemarks(combined);
  }, [user?.id]);

  useEffect(() => {
    fetchRemarks();
    if (!supabase || !user?.id) return;
    const ch = supabase
      .channel('public:mentor_remarks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mentor_remarks' }, fetchRemarks)
      .subscribe();
    return () => {
      ch.unsubscribe();
    };
  }, [user?.id, fetchRemarks]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mentor Remarks</h1>
        <p className="text-gray-600">View remarks and feedback from your mentor</p>
      </div>

      {remarks.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600">No remarks available yet.</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {remarks.map((remark: any) => (
            <Card key={remark.id}>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium text-gray-800">
                      {new Date(remark.date || remark.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Remark</p>
                  <p className="text-gray-800 bg-blue-50 p-4 rounded-lg">
                    {remark.remark || remark.content}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Mentor Signature</p>
                  <div className="w-full h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500">
                    Signature Placeholder
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
