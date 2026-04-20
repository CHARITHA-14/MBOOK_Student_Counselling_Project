export function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
}

export function getCurrentRole(): 'student' | 'mentor' | null {
  return localStorage.getItem('role') as 'student' | 'mentor' | null;
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('user') && !!localStorage.getItem('role');
}
