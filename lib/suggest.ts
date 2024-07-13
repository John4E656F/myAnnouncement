import type { AnnounceProps } from '../types';

export async function suggestAnnouncement(data: AnnounceProps): Promise<AnnounceProps> {
  try {
    const response = await fetch('http://localhost:5001/announce/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send data');
    }

    const newData = await response.json();
    return newData;
  } catch (error) {
    console.error('Error suggesting announcement:', error);
    throw error;
  }
}
