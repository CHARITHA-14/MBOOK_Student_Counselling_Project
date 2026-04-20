import React, { useEffect, useState, useCallback } from 'react';
import Card from '../components/Card';
import { Bell, AlertCircle, Info, CheckCircle, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getCurrentUser, getCurrentRole } from '../utils/auth';

function timeAgo(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

export const Notifications: React.FC = () => {
  const user = getCurrentUser();
  const role = getCurrentRole();
  type NotificationItem = {
    id: string;
    type: 'alert' | 'success' | 'info';
    title: string;
    message: string;
    created_at: string;
  };
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const key = `notifications:lastSeen:${role}:${user?.id}`;
  const computeUnread = (list: NotificationItem[]) => {
    const lastSeen = localStorage.getItem(key);
    if (!lastSeen) return list.length;
    const ts = new Date(lastSeen).getTime();
    return list.filter((i) => new Date(i.created_at).getTime() > ts).length;
  };

  const fetchAll = useCallback(async () => {
    if (!supabase || !user?.id || !role) {
      setItems([]);
      setUnreadCount(0);
      return;
    }
    const filters =
      role === 'student'
        ? { column: 'student_id', value: user.id }
        : { column: 'mentor_id', value: user.id };
    const { data: remarks } = await supabase
      .from('mentor_remarks')
      .select('*')
      .eq(filters.column, filters.value)
      .order('created_at', { ascending: false });
    const { data: sessions } = await supabase
      .from('counselling_records')
      .select('*')
      .eq(filters.column, filters.value)
      .order('created_at', { ascending: false });
    const list: NotificationItem[] = [
      ...(remarks || []).map((r: { id: string; remark: string; created_at: string }): NotificationItem => ({
        id: r.id,
        type: 'info',
        title: 'New Mentor Remark',
        message: r.remark,
        created_at: r.created_at,
      })),
      ...(sessions || []).map((s: { id: string; outcome?: string; purpose?: string; created_at: string }): NotificationItem => ({
        id: s.id,
        type: 'success',
        title: 'Counselling Record Added',
        message: s.outcome ?? s.purpose ?? '',
        created_at: s.created_at,
      })),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setItems(list);
    setUnreadCount(computeUnread(list));
  }, [user?.id, role]);

  useEffect(() => {
    fetchAll();
    if (!supabase) return;
    const ch1 = supabase
      .channel('public:mentor_remarks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mentor_remarks' }, fetchAll)
      .subscribe();
    const ch2 = supabase
      .channel('public:counselling_records')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'counselling_records' }, fetchAll)
      .subscribe();
    return () => {
      ch1.unsubscribe();
      ch2.unsubscribe();
    };
  }, [user?.id, role, fetchAll]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBgColor = (type: string, read: boolean) => {
    if (read) return 'bg-white';
    switch (type) {
      case 'alert':
        return 'bg-red-50';
      case 'success':
        return 'bg-green-50';
      case 'info':
        return 'bg-blue-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
        <button
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          onClick={() => {
            localStorage.setItem(key, new Date().toISOString());
            setUnreadCount(0);
          }}
        >
          Mark all as read
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <Bell className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <p className="text-3xl font-bold text-gray-800">{items.length}</p>
          <p className="text-sm text-gray-600">Total Notifications</p>
        </Card>

        <Card className="text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
          <p className="text-3xl font-bold text-gray-800">
            {unreadCount}
          </p>
          <p className="text-sm text-gray-600">Unread</p>
        </Card>

        <Card className="text-center">
          <Calendar className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <p className="text-3xl font-bold text-gray-800">Today</p>
          <p className="text-sm text-gray-600">Last Update</p>
        </Card>
      </div>

      <div className="space-y-3">
        {items.map((notification) => (
          <Card
            key={notification.id}
            className={`${getBgColor(notification.type, false)} ${
              'border-l-4 border-blue-500'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-semibold text-gray-800">{notification.title}</h3>
                  <span className="text-xs text-gray-500">{timeAgo(notification.created_at)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              </div>
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
