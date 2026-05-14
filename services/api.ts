const API_BASE_URL = '/api';
const AUTH_TOKEN = process.env.NEXT_PUBLIC_API_SECRET_TOKEN || 'hello-my-token';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${AUTH_TOKEN}`
};

export const api = {
  suggestions: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/suggestions`, { headers });
      return res.json();
    },
    create: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/suggestions`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      return res.json();
    }
  },
  support: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/support`, { headers });
      return res.json();
    },
    create: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/support`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      return res.json();
    }
  },
  campusReps: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/campus-reps`, { headers });
      return res.json();
    },
    create: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/campus-reps`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      return res.json();
    }
  },
  creators: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/creators`, { headers });
      return res.json();
    },
    create: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/creators`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      return res.json();
    }
  },
  materialRequests: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/material-requests`, { headers });
      return res.json();
    },
    create: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/material-requests`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      return res.json();
    }
  },
  newsletter: {
    subscribe: async (email: string) => {
      const res = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email })
      });
      return res.json();
    }
  }
};
