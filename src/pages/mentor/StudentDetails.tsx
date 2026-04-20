import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getStudentsSync } from '../../lib/data';
import Card from '../../components/Card';
import Table, { TableRow, TableCell } from '../../components/Table';
import Modal from '../../components/Modal';
import { FormInput, FormTextarea } from '../../components/FormInput';
import { ArrowLeft, Plus, MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { getCurrentUser } from '../../utils/auth';

type LocalCounselling = { id: string; date: string; purpose: string; discussionSummary?: string; outcome?: string };
type LocalRemark = { id: string; date: string; remark: string };

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCounsellingModalOpen, setIsCounsellingModalOpen] = useState(false);
  const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(1);

  const studentsData = getStudentsSync();
  const student = studentsData.find((s) => s.id === id);

  const semesters = student?.academicPerformance || [];
  const [counsellingList, setCounsellingList] = useState<LocalCounselling[]>(student?.counsellingRecords || []);
  const [remarksList, setRemarksList] = useState<LocalRemark[]>(student?.mentorRemarks || []);

  if (!student) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Student not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/mentor/students')}
          className="p-2 hover:bg-blue-50 rounded-lg"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Details</h1>
          <p className="text-gray-600">Complete counselling record for {student.name}</p>
        </div>
      </div>

      {/* Basic Student Info */}
      <Card title="Basic Student Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <img
              src={student.photo || `https://ui-avatars.com/api/?name=${student.name}&background=2563eb&color=fff&size=128`}
              alt={student.name}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
              <p className="text-gray-600">{student.registrationNumber}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Branch:</span>
              <span className="ml-2 font-medium">{student.branch}</span>
            </div>
            <div>
              <span className="text-gray-600">Year & Section:</span>
              <span className="ml-2 font-medium">Year {student.year} - Section {student.section}</span>
            </div>
            <div>
              <span className="text-gray-600">CGPA:</span>
              <span className="ml-2 font-medium">{student.cgpa || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-600">Attendance:</span>
              <span className="ml-2 font-medium">{student.attendance || 0}%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Details */}
      <Card title="Personal Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Date of Birth:</span>
            <span className="ml-2 font-medium">{student.dateOfBirth || 'N/A'}</span>
          </div>
          <div>
            <span className="text-gray-600">Gender:</span>
            <span className="ml-2 font-medium">{student.gender || 'N/A'}</span>
          </div>
          <div>
            <span className="text-gray-600">Blood Group:</span>
            <span className="ml-2 font-medium">{student.bloodGroup || 'N/A'}</span>
          </div>
          <div>
            <span className="text-gray-600">Email:</span>
            <span className="ml-2 font-medium">{student.email}</span>
          </div>
          <div>
            <span className="text-gray-600">Phone:</span>
            <span className="ml-2 font-medium">{student.phone || 'N/A'}</span>
          </div>
          <div>
            <span className="text-gray-600">Address:</span>
            <span className="ml-2 font-medium">{student.address || 'N/A'}</span>
          </div>
        </div>
      </Card>

      {/* Parent Details */}
      <Card title="Parent Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Father</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-medium">{student.father?.name || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-600">Phone:</span>
                <span className="ml-2 font-medium">{student.father?.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-600">Occupation:</span>
                <span className="ml-2 font-medium">{student.father?.occupation || 'N/A'}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Mother</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-medium">{student.mother?.name || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-600">Phone:</span>
                <span className="ml-2 font-medium">{student.mother?.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-600">Occupation:</span>
                <span className="ml-2 font-medium">{student.mother?.occupation || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Academic Performance */}
      <Card title="Academic Performance">
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 border-b border-gray-200">
            {semesters.map((sem: any) => (
              <button
                key={sem.semester}
                onClick={() => setSelectedSemester(sem.semester)}
                className={`px-4 py-2 font-medium transition-colors ${
                  selectedSemester === sem.semester
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Semester {sem.semester}
              </button>
            ))}
          </div>
        </div>

        {semesters.find((s: any) => s.semester === selectedSemester) && (
          <Table
            headers={[
              'Subject Code',
              'Subject Name',
              'Attendance %',
              'Mid Marks',
              'Internal Marks',
              'Grade',
              'Credits',
            ]}
          >
            {semesters
              .find((s: { semester: number }) => s.semester === selectedSemester)
              ?.subjects?.map((subject: { code: string; name: string; attendance?: number; midMarks?: number; internalMarks?: number; grade?: string; credits?: number }, index: number) => (
                <TableRow key={index}>
                  <TableCell>{subject.code}</TableCell>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.attendance}%</TableCell>
                  <TableCell>{subject.midMarks}</TableCell>
                  <TableCell>{subject.internalMarks}</TableCell>
                  <TableCell>{subject.grade}</TableCell>
                  <TableCell>{subject.credits}</TableCell>
                </TableRow>
              ))}
          </Table>
        )}
      </Card>

      {/* Counselling History */}
      <Card
        title="Counselling History"
        action={
          <button
            onClick={() => setIsCounsellingModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Record</span>
          </button>
        }
      >
        {!student ? (
          <p className="text-gray-600 text-center py-4">Student not found.</p>
        ) : counsellingList && counsellingList.length > 0 ? (
          <div className="space-y-4">
            {counsellingList.map((record) => (
              <div key={record.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-800">{record.purpose}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Discussion:</span> {record.discussionSummary}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-medium">Outcome:</span> {record.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-4">No counselling records yet.</p>
        )}
      </Card>

      {/* Backlogs */}
      {student.backlogDetails && student.backlogDetails.length > 0 && (
        <Card title="Backlog Details">
          <Table headers={['Subject', 'Attempt Number', 'Month/Year', 'Grade']}>
            {student.backlogDetails.map((backlog: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{backlog.subject}</TableCell>
                <TableCell>Attempt {backlog.attemptNumber}</TableCell>
                <TableCell>{backlog.monthYear}</TableCell>
                <TableCell>{backlog.grade}</TableCell>
              </TableRow>
            ))}
          </Table>
        </Card>
      )}

      {/* Interests & Strengths */}
      <Card title="Interests & Strengths">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Interests</h4>
            <p className="text-gray-700">
              {Array.isArray(student.interests)
                ? student.interests.join(', ')
                : student.interests || 'N/A'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Strengths</h4>
            <p className="text-gray-700">
              {Array.isArray(student.strengths)
                ? student.strengths.join(', ')
                : student.strengths || 'N/A'}
            </p>
          </div>
        </div>
      </Card>

      {/* Mentor Remarks */}
      <Card
        title="Mentor Remarks"
        action={
          <button
            onClick={() => setIsRemarkModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Add Remark</span>
          </button>
        }
      >
        {!student ? (
          <p className="text-gray-600 text-center py-4">Student not found.</p>
        ) : remarksList && remarksList.length > 0 ? (
          <div className="space-y-4">
            {remarksList.map((remark) => (
              <div key={remark.id} className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  {new Date(remark.date).toLocaleDateString()}
                </p>
                <p className="text-gray-800">{remark.remark}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-4">No remarks yet.</p>
        )}
      </Card>

      {/* Modals */}
      <Modal
        isOpen={isCounsellingModalOpen}
        onClose={() => setIsCounsellingModalOpen(false)}
        title="Add Counselling Record"
        size="lg"
      >
        <CounsellingForm
          onClose={() => setIsCounsellingModalOpen(false)}
          onCreated={(item) => setCounsellingList((prev) => [item, ...prev])}
        />
      </Modal>

      <Modal
        isOpen={isRemarkModalOpen}
        onClose={() => setIsRemarkModalOpen(false)}
        title="Add Mentor Remark"
        size="md"
      >
        <RemarkForm
          onClose={() => setIsRemarkModalOpen(false)}
          onCreated={(item) => setRemarksList((prev) => [item, ...prev])}
        />
      </Modal>
    </div>
  );
}

function CounsellingForm({ onClose, onCreated }: { onClose: () => void; onCreated: (item: LocalCounselling) => void }) {
  const [formData, setFormData] = useState({
    date: '',
    purpose: '',
    discussionSummary: '',
    outcome: '',
  });
  const mentor = getCurrentUser();
  const { id: studentId } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mentor?.id && studentId) {
      const id = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
      if (supabase) {
        await supabase.from('counselling_records').insert({
          id,
          student_id: studentId,
          mentor_id: mentor.id,
          date: formData.date,
          purpose: formData.purpose,
          discussion_summary: formData.discussionSummary,
          outcome: formData.outcome,
        });
      }
      const key = `updates:counselling_records:${studentId}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.unshift({
        id,
        student_id: studentId,
        mentor_id: mentor.id,
        date: formData.date,
        purpose: formData.purpose,
        discussion_summary: formData.discussionSummary,
        outcome: formData.outcome,
        created_at: new Date().toISOString(),
      });
      localStorage.setItem(key, JSON.stringify(existing));
      onCreated({
        id,
        date: formData.date,
        purpose: formData.purpose,
        discussionSummary: formData.discussionSummary,
        outcome: formData.outcome,
      });
    }
    onClose();
  };

  return (
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
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Record
        </button>
      </div>
    </form>
  );
}

function RemarkForm({ onClose, onCreated }: { onClose: () => void; onCreated: (item: LocalRemark) => void }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    remark: '',
  });
  const mentor = getCurrentUser();
  const { id: studentId } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mentor?.id && studentId) {
      const id = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
      if (supabase) {
        await supabase.from('mentor_remarks').insert({
          id,
          student_id: studentId,
          mentor_id: mentor.id,
          date: formData.date,
          remark: formData.remark,
        });
      }
      const key = `updates:mentor_remarks:${studentId}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.unshift({
        id,
        student_id: studentId,
        mentor_id: mentor.id,
        date: formData.date,
        remark: formData.remark,
        created_at: new Date().toISOString(),
      });
      localStorage.setItem(key, JSON.stringify(existing));
      onCreated({
        id,
        date: formData.date,
        remark: formData.remark,
      });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <FormTextarea
        label="Remark"
        name="remark"
        value={formData.remark}
        onChange={handleChange}
        rows={6}
        required
      />
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Remark
        </button>
      </div>
    </form>
  );
}
