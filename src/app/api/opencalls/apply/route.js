import { db, admin } from '@/lib/firebase/server/firebase_admin';
import { NextResponse } from 'next/server';

function createTimestamp() {
  if (admin?.firestore?.Timestamp) {
    return admin.firestore.Timestamp.now();
  }
  return new Date().toISOString();
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      callId,
      fullName,
      email,
      areaOfExpertise,
      topicDescription,
      profileLinks,
    } = body;

    if (!callId || !fullName?.trim() || !email?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: callId, fullName, email' },
        { status: 400 }
      );
    }

    const doc = {
      callId: String(callId),
      fullName: (fullName || '').trim(),
      email: (email || '').trim(),
      areaOfExpertise: (areaOfExpertise || '').trim(),
      topicDescription: (topicDescription || '').trim(),
      profileLinks: Array.isArray(profileLinks) ? profileLinks.filter(Boolean).map(String) : [],
      status: 'under_review',
      createdAt: createTimestamp(),
    };

    const ref = await db.collection('open_call_applications').add(doc);
    return NextResponse.json({ success: true, id: ref.id });
  } catch (error) {
    console.error('Open call apply error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
