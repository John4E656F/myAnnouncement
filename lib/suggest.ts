import type { AnnounceProps } from '../types';

interface SuggestAnnouncementResponse {
  msg: string; // or any other message field
  data: AnnounceProps;
}

export async function suggestAnnouncement(data: AnnounceProps): Promise<SuggestAnnouncementResponse> {
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

    const result: SuggestAnnouncementResponse = await response.json();
    return result;
  } catch (error) {
    console.error('Error suggesting announcement:', error);
    throw error;
  }
}

export async function updateAnnouncement(_id: string, data: AnnounceProps): Promise<AnnounceProps> {
  try {
    const response = await fetch(`http://localhost:5001/announce/suggest/edit/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update data');
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error('Error updating announcement:', error);
    throw error;
  }
}
