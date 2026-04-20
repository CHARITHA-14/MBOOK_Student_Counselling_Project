import { useEffect, useState, useCallback } from 'react';
import { getCurrentUser } from '../../utils/auth';
import Card from '../../components/Card';
import Table, { TableRow, TableCell } from '../../components/Table';
import Modal from '../../components/Modal';
import { FormInput, FormTextarea } from '../../components/FormInput';
import { Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function CounsellingRecords() {
  const user = getCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    purpose: '',
    discussionSummary: '',
    outcome: '',
  });

  type CounsellingItem = {
    id: string;
    date?: string;
    purpose?: string;
    discussion_summary?: string;
    outcome?: string;
    created_at?: string;
  };
  const [records, setRecords] = useState<CounsellingItem[]>(user?.counsellingRecords || []);

  const fetchRecords = useCallback(async () => {
    if (!supabase || !user?.id) {
      const local = JSON.parse(localStorage.getItem(`updates:counselling_records:${user?.id}`) || '[]') as CounsellingItem[];
      const initial = (user?.counsellingRecords || []) as CounsellingItem[];
      const combined = [...local, ...initial].sort(
        (a, b) =>
          new Date(b.created_at || b.date || '').getTime() - new Date(a.created_at || a.date || '').getTime()
      );
      setRecords(combined);
      return;
    }
    const { data } = await supabase
      .from('counselling_records')
      .select('*')
      .eq('student_id', user.id)
      .order('created_at', { ascending: false });
    const local = JSON.parse(localStorage.getItem(`updates:counselling_records:${user.id}`) || '[]') as CounsellingItem[];
    const combined = [...(data || []), ...local].sort(
      (a, b) =>
        new Date(b.created_at || b.date || '').getTime() - new Date(a.created_at || a.date || '').getTime()
    );
    setRecords(combined);
  }, [user?.id]);

  useEffect(() => {
    fetchRecords();
    if (!supabase || !user?.id) return;
    const ch = supabase
      .channel('public:counselling_records')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'counselling_records' }, fetchRecords)
      .subscribe();
    return () => {
      ch.unsubscribe();
    };
  }, [user?.id, fetchRecords]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (supabase && user?.id) {
      const id = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
      await supabase.from('counselling_records').insert({
        id,
        student_id: user.id,
        mentor_id: user.mentorId || null,
        date: formData.date,
        purpose: formData.purpose,
        discussion_summary: formData.discussionSummary,
        outcome: formData.outcome,
      });
      await fetchRecords();
    }
    setIsModalOpen(false);
    setFormData({ date: '', purpose: '', discussionSummary: '', outcome: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Counselling Records</h1>
          <p className="text-gray-600">View and manage your counselling sessions</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Counselling Session</span>
        </button>
      </div>

      <Card>
        {records.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No counselling records found.</p>
          </div>
        ) : (
          <Table
            headers={[
              'Date',
              'Purpose',
              'Discussion Summary',
              'Outcome / Remarks',
              'Student Signature',
              'Mentor Signature',
            ]}
          >
            {records.map((record: any) => (
              <TableRow key={record.id}>
                <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                <TableCell>{record.purpose}</TableCell>
                <TableCell className="max-w-xs">{record.discussionSummary}</TableCell>
                <TableCell className="max-w-xs">{record.outcome}</TableCell>
                <TableCell>
                  <div className="w-24 h-12 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500">
                    Signature
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-24 h-12 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500">
                    Signature
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Counselling Session"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Purpose"
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="e.g., Academic Performance Review"
            required
          />
          <FormTextarea
            label="Discussion Summary"
            name="discussionSummary"
            value={formData.discussionSummary}
            onChange={handleChange}
            rows={4}
            required
          />
          <FormTextarea
            label="Outcome / Remarks"
            name="outcome"
            value={formData.outcome}
            onChange={handleChange}
            rows={3}
            required
          />
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
