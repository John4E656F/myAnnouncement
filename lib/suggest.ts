import type { AnnounceProps } from '../types';

interface SuggestAnnouncementResponse {
  msg: string; // or any other message field
  data: AnnounceProps;
}

interface DeleteAnnouncementResponse {
  success: boolean;
  msg?: string;
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

export async function deleteSuggestAnnouncement(_id: string): Promise<DeleteAnnouncementResponse> {
  try {
    const response = await fetch(`http://localhost:5001/announce/suggest/delete/${_id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return {
        success: false,
        msg: 'Failed to delete announcement',
      };
    }

    return {
      success: true,
      msg: 'Announcement deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      msg: `Error deleting announcement: ${(error as Error).message}`,
    };
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
